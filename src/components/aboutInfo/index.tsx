import Image from "next/image";
import { MapPin } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutInfo = () => {
  return (
    <div className="max-w-md min-h-[500px] flex flex-col items-center gap-4">
      <div className="w-36 h-36 overflow-hidden">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            width={144}
            height={144}
            priority
            className="object-cover rounded overflow-hidden "
          />
        </AspectRatio>
      </div>
      <div className="w-full justify-center items-center flex flex-col gap-2">
        <h1 className="text-2xl font-bold">João Barroso</h1>
        <h2 className="flex gap-2 text-gray-500 items-center text-xl font-semibold">
          Setúbal, Portugal
          <MapPin className="hidden md:flex size-4" />
        </h2>
        <p className="text-gray-500">Front-End Developer</p>
      </div>

      <Tabs defaultValue="english">
        <TabsList className="grid w-full grid-cols-2 bg-inherit dark:bg-inherit">
          <TabsTrigger
            value="english"
            className="data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-800"
          >
            In English
          </TabsTrigger>
          <TabsTrigger
            value="portuguese"
            className="data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-gray-800"
          >
            Em Português
          </TabsTrigger>
        </TabsList>
        <TabsContent value="english">
          Master&apos;s Degree in Computer Science, which I always had interest
          and passion in. I am self-motivated, dedicated to my work, adaptable
          to change, responsible, with advanced interpersonal relationship
          skills and good humour. I have professional experience while working
          on projects with teams between 3-20 members.
        </TabsContent>
        <TabsContent value="portuguese">
          Mestrado em Engenharia Informática, curso este que sempre gostei. Sou
          auto-motivado, dedicado ao trabalho, adaptável à mudança, responsável,
          de bom humor e relacionamento. Tenho experiência profissional ao
          trabalhar em projetos de equipas de 3-20 elementos.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutInfo;
