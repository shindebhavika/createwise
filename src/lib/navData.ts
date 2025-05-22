// src/data/data.ts

import {
    FileText,
    Wallet,
    Share2,
    Link,
    Plug2,
    Info,
    BellRing,
    UserPen,
    GalleryVerticalEnd,
    Frame,
    PieChart,
    Map,
  } from "lucide-react";
  
  import { MdOutlineStars } from "react-icons/md";
  import { AiOutlineDollar } from "react-icons/ai";
  import { RiChatAiLine } from "react-icons/ri";
  
  interface NavItem {
    title: string;
    url: string;
  }
  
  interface NavSection {
    title: string;
    url: string;
    icon: any;
    isActive?: boolean;
    items: NavItem[];
  }
  
  interface Project {
    name: string;
    url: string;
    icon: any;
  }
  
  interface Team {
    name: string;
    logo: any;
    plan: string;
  }
  
  interface User {
    name: string;
    email: string;
    avatar: string;
  }
  
  interface DataStructure {
    user: User;
    teams: Team[];
    navMain: NavSection[];
    projects: Project[];
  }
  
  export const data: DataStructure = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Albn",
        logo: GalleryVerticalEnd,
        plan: "Amazon.com",
      },
    ],
    navMain: [
      {
        title: "Articles",
        url: "#",
        icon: FileText,
        isActive: true,
        items: [
          { title: "Create Article", url: "#" },
          { title: "Generated Articles", url: "#" },
          { title: "Keyword Projects", url: "#" },
          { title: "AI Keyword to Article", url: "#" },
          { title: "Steal Competitor Keyword", url: "#" },
          { title: "Import Keyword from GSC", url: "#" },
          { title: "Manual Keyword to Article", url: "#" },
          { title: "Bulk Competitor Keyword", url: "#" },
          { title: "Longtail Keyword from GSC", url: "#" },
          { title: "Article Settings", url: "#" },
        ],
      },
      {
        title: "Auto Blog ",
        url: "#",
        icon: Wallet,
        items: [
          { title: "Genesis", url: "#" },
          { title: "Explorer", url: "#" },
          { title: "Quantum", url: "#" },
        ],
      },
      {
        title: "Internal Links",
        url: "#",
        icon: Share2,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Free Backlinks",
        url: "#",
        icon: Link,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Integrations",
        url: "#",
        icon: Plug2,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Subscription",
        url: "#",
        icon: MdOutlineStars,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Affiliate Program",
        url: "#",
        icon: AiOutlineDollar,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Help Center",
        url: "#",
        icon: Info,
        items: [
          { title: "General", url: "#" },
          { title: "Team", url: "#" },
          { title: "Billing", url: "#" },
          { title: "Limits", url: "#" },
        ],
      },
      {
        title: "Updates",
        url: "#",
        icon: BellRing,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Live Chat Support",
        url: "#",
        icon: RiChatAiLine,
        items: [{ title: "Introduction", url: "#" }],
      },
      {
        title: "Profile",
        url: "#",
        icon: UserPen,
        items: [{ title: "Introduction", url: "#" }],
      },
    ],
    projects: [
      { name: "Design Engineering", url: "#", icon: Frame },
      { name: "Sales & Marketing", url: "#", icon: PieChart },
      { name: "Travel", url: "#", icon: Map },
    ],
  };
  