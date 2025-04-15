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
      label: "Meme List",
      href: "/list",
    },
    {
      label: "Meme Table",
      href: "/table",
    },
  ],
  navMenuItems: [
    {
      label: "Meme List",
      href: "/list",
    },
    {
      label: "Meme Table",
      href: "/table",
    },
  ],
  links: {
    github: "https://github.com/PowerLesha/Memes-test-task",
  },
};
