export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Meme Table",
      href: "/table",
    },
    {
      label: "Meme List",
      href: "/list",
    },
  ],
  navMenuItems: [
    {
      label: "Meme Table",
      href: "/table",
    },
    {
      label: "Meme List",
      href: "/list",
    },
  ],
  links: {
    github: "https://github.com/PowerLesha/Memes-test-task",
  },
};
