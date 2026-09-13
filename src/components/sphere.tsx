"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uHover;
uniform float uGrain; uniform float uWarp; uniform float uHue; uniform float uRad;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x), u.y);
}
float fbm(vec2 p){ float s=0.,a=.5; for(int i=0;i<5;i++){ s+=a*vnoise(p); p=p*2.03+11.3; a*=.5; } return s; }
vec3 hueRot(vec3 col, float h){
  vec3 k = vec3(0.57735); float c = cos(h), s = sin(h);
  return col*c + cross(k,col)*s + k*dot(k,col)*(1.0-c);
}
void main(){
  float mn = min(uRes.x,uRes.y);
  vec2 p = (gl_FragCoord.xy - .5*uRes)/mn;
  float t = uTime*0.05;
  vec2 d = p - uMouse; float dl = length(d);
  float infl = exp(-dl*(1.15/uRad));
  vec2 push  = normalize(d + 1e-5)*infl*0.115*uHover;
  vec2 swirl = vec2(-d.y, d.x)*infl*0.85*uHover;
  vec2 pw = p + push + swirl;
  vec2 q = pw*(0.52/uRad);
  vec2 w = vec2(fbm(q + vec2(t,-t*1.3)), fbm(q + vec2(3.2 - t, 1.7 + t)));
  float f = fbm(q*1.15 + w*(1.5+uWarp) + vec2(0., t*.8));
  f += .32*fbm(q*2.6 - w*1.1 + t*.4);
  float r = length(pw)/uRad*0.45;
  f = f*.92 + smoothstep(.16,.46,r)*.42;
  f = clamp(f*.95, 0., 1.25);

  vec3 orange=vec3(1.,.55,.06), red=vec3(.93,.22,.14), dark=vec3(.035,.035,.04),
       teal=vec3(.04,.46,.44), pink=vec3(1.,.45,.6);
  vec3 col = orange;
  col = mix(col, red,  smoothstep(.10,.36,f));
  col = mix(col, dark, smoothstep(.33,.57,f));
  col = mix(col, teal, smoothstep(.54,.76,f));
  col = mix(col, pink, smoothstep(.72,1.02,f));
  col = hueRot(col, uHue);

  float rr = length(p);
  float rad = uRad;
  float a = smoothstep(rad, rad-.006, rr);
  col = mix(col, vec3(.02), smoothstep(rad-uRad*.10, rad-uRad*.005, rr)*.6);
  float g = hash(gl_FragCoord.xy*1.37 + fract(uTime*.9)*vec2(37.,71.));
  col += (g-.5)*uGrain;
  gl_FragColor = vec4(clamp(col,0.,1.), a);
}`;

// One hue rotation per panel (intro, work, about, experience, contact).
const HUES = [0, 0.55, -0.5, 1.15, 2.1];
const GRAIN = 0.16;
const WARP = 0.5;
const RADIUS = 0.34;

export default function Sphere({ active }: { active: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const host = hostRef.current!;
    const canvas = host.firstElementChild as HTMLCanvasElement;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true });
    if (!gl) {
      host.classList.add("is-fallback");
      return;
    }

    const prog = gl.createProgram()!;
    for (const [type, src] of [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]] as const) {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh));
      gl.attachShader(prog, sh);
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      host.classList.add("is-fallback");
      return;
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = Object.fromEntries(
      ["uRes", "uTime", "uMouse", "uHover", "uGrain", "uWarp", "uHue", "uRad"].map((n) => [n, gl.getUniformLocation(prog, n)]),
    );

    let w = 1, h = 1, hover = 0, hoverT = 0, hue = 0, raf = 0, onScreen = true;
    const mouse = [0, 0], target = [0, 0];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = host.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.round(r.width * dpr));
      h = canvas.height = Math.max(1, Math.round(r.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const mn = Math.min(r.width, r.height);
      target[0] = (e.clientX - r.left - r.width / 2) / mn;
      target[1] = -(e.clientY - r.top - r.height / 2) / mn;
      hoverT = Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2) < mn * 0.75 ? 1 : 0;
    };
    addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      if (!onScreen) {
        raf = 0;
        return;
      }
      hue += ((HUES[activeRef.current] ?? 0) - hue) * 0.05;
      mouse[0] += (target[0] - mouse[0]) * 0.07;
      mouse[1] += (target[1] - mouse[1]) * 0.07;
      hover += (hoverT - hover) * 0.06;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
      gl.uniform1f(U.uTime, reduced ? 14 : now / 1000);
      gl.uniform2f(U.uMouse, mouse[0], mouse[1]);
      gl.uniform1f(U.uHover, hover);
      gl.uniform1f(U.uGrain, GRAIN);
      gl.uniform1f(U.uWarp, WARP);
      gl.uniform1f(U.uHue, hue);
      gl.uniform1f(U.uRad, RADIUS);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };

    // Stop rendering the shader while the sphere is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={hostRef} className="sphere" aria-hidden="true">
      <canvas />
    </div>
  );
}
