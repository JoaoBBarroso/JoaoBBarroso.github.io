import { Fragment } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const links = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jo%C3%A3o-diogo-barroso/",
    },
    {
      name: "GitHub",
      url: "https://github.com/JoaoBBarroso",
    },
  ];

  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      {links.map((link, index) => (
        <Fragment key={link.name}>
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            {link.name}
          </Link>
          {index < links.length - 1 && (
            <Separator className="h-5" orientation="vertical" />
          )}
        </Fragment>
      ))}
    </footer>
  );
};

export default Footer;
