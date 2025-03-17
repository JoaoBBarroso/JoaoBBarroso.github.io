"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FileDown, Mail, MailCheck, Menu, Moon, Sun } from "lucide-react";

const HeaderSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { theme, setTheme } = useTheme();
  const path = usePathname();

  useEffect(() => {
    if (isCopied) {
      toast("Email copied to clipboard");
    }
  }, [isCopied]);

  const isPath = (pathname: string) =>
    path === pathname ? "border-b-[1px]" : "hover:opacity-50 ";

  const paths = [
    { href: "/", name: "Work" },
    { href: "/about", name: "About" },
  ];

  const renderThemeButton = () => (
    <Button
      variant="ghost"
      className="relative leading-5 text-base hover:bg-gray-300 dark:hover:bg-gray-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <p className=" z-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
        Lgt
      </p>
      <p className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
        Drk
      </p>
      <span className="sr-only">Toggle theme</span>

      <span className="absolute inset-0 flex items-center justify-center opacity-10">
        <Sun className="!size-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="!size-8 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
    </Button>
  );

  const renderOptions = () => (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className=""
              onClick={() => window.open("/CV Joao Barroso 2025.pdf")}
            >
              <FileDown className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="hidden md:flex">
            <p>Download CV</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="relative font-medium leading-5 text-base hover:bg-gray-300 dark:hover:bg-gray-800"
              onClick={() => {
                navigator.clipboard.writeText("joaodb.barroso@gmail.com");
                setIsCopied(true);
              }}
            >
              <p className="size-4">
                {isCopied ? (
                  <MailCheck className="size-4" />
                ) : (
                  <Mail className=" size-4" />
                )}
              </p>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="hidden md:flex">
            <p>Copy Email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {renderThemeButton()}
    </>
  );

  const renderMobileOptions = () => (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        className="relative font-medium leading-5 text-base hover:bg-gray-300 dark:hover:bg-gray-800"
        onClick={() => window.open("/CV Joao Barroso 2025.pdf")}
      >
        Download CV
      </Button>
      <Button
        variant="ghost"
        className="relative font-medium leading-5 text-base hover:bg-gray-300 dark:hover:bg-gray-800"
        onClick={() => {
          navigator.clipboard.writeText("joaodb.barroso@gmail.com");
          setIsCopied(true);
        }}
      >
        {isCopied ? "Email Copied!" : "Copy Email"}
      </Button>
      {renderThemeButton()}
    </div>
  );

  return (
    <header className="flex w-full items-center justify-between py-4 px-8">
      <div className=" flex w-1/3 justify-start items-center gap-4">
        <Avatar className="transition-all duration-100 hover:scale-[2.00]">
          <AvatarImage src="/profile.jpg" alt="@barroso.96" />
          <AvatarFallback>@barroso.96</AvatarFallback>
        </Avatar>
        {/* <span className="hidden md:flex ">João Barroso </span>{" "} */}
      </div>

      <NavigationMenu className="h-full w-1/3">
        <NavigationMenuList className="h-full flex justify-center items-center gap-2">
          {paths.map(({ href, name }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={` ${isPath(href)}`}>
                  {name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <span className="flex w-1/3 justify-end items-center gap-4">
        <Popover>
          <PopoverTrigger className="flex md:hidden" asChild>
            <Button variant="ghost">
              <Menu className="size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex md:hidden w-fit ">
            {renderMobileOptions()}
          </PopoverContent>
        </Popover>

        <div className="hidden md:flex">{renderOptions()}</div>
      </span>
    </header>
  );
};

export default HeaderSection;
