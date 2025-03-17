import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
const careerList = [
  {
    id: 1,
    title: "Front-End Developer",
    timeSpent: "May 2022 - Present",
    companies: ["Boligmappa, Oslo, Norway", "INSCALE, Lisbon, Portugal"],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "Jest",
      "React Testing Library",
      "Playwright",
      "Atlassian Suite",
      "Storybook",
    ],
    description:
      "First FE developer to join the project. Created a modern leading front-end solution for craftsmen in Norway to document their work.",
  },
  {
    id: 2,
    title: "Front-End Developer",
    timeSpent: "Aug 2021 - May 2022",
    companies: ["iCapital, Lisbon, Portugal"],
    stack: ["React", "JavaScript", "Redux", "Jest"],
    description:
      "Joined a team of 10+ developers to improve the iCapital platform, which was an investment marketplace.",
  },
  {
    id: 3,
    title: "Front-End Developer",
    timeSpent: "May 2019 - Aug 2021",
    companies: ["Novabase, Lisbon, Portugal"],
    stack: [
      "React",
      "JavaScript",
      "Typescript",
      "Redux",
      "Ant Design",
      "Azure DevOps",
    ],
    description:
      "Worked on different projects during my time at Novabase. Mainly focused on developing front-end solutions for banking, telecommunications, e-procurement companies and also internal projects for Novabase.",
  },
  {
    id: 4,
    title: "Front-End Developer",

    timeSpent: "Apr 2018 - Apr 2019",
    companies: ["INSTICC, Setúbal, Portugal"],
    stack: ["React", "JavaScript", "Node.js"],
    description:
      "Joined this Scientific Conference Company fresh off University. Was introduced to React.js and Node.js but mainly focused on developing FE small projects - like a poster CMS.",
  },
];

const CareerList = () => {
  return (
    <div>
      <h1>Experience so far</h1>

      <div className="grid grid-cols-1 gap-4 ">
        {careerList.map((career) => (
          <Fragment key={career.id}>
            <Card className="bg-inherit text-inherit dark:border-slate-800 dark:bg-inherit dark:text-inherit">
              <CardHeader>
                <CardTitle>{career.title}</CardTitle>
                <CardDescription>{career.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <h4 className="text-sm underline">{career.timeSpent}</h4>
                <span className="flex items-center text-sm gap-1">
                  {career.companies.join(" & ")}{" "}
                  <MapPin className="hidden md:flex size-4" />
                </span>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between">
                <div className="flex flex-wrap items-center text-sm gap-2">
                  {career.stack.map((tech, index) => (
                    <Fragment key={index}>
                      {tech}
                      {index < career.stack.length - 1 && (
                        <Separator className="h-5" orientation="vertical" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CareerList;
