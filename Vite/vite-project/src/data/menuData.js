const menuData = [
  {
    title: "Home",
    link: "/home",
    component: "HomeComponent",
    children: [],
  },
  {
    title: "About",
    link: "/about",
    component: "AboutComponent",
    children: [
      {
        title: "Team",
        link: "/about/team",
        component: "TeamComponent",
        children: [],
      },
      {
        title: "History",
        link: "/about/history",
        component: "HistoryComponent",
        children: [],
      },
    ],
  },
  {
    title: "Services",
    link: "/services",
    component: "ServicesComponent",
    children: [
      {
        title: "Web Development",
        link: "/services/web",
        component: "WebDevComponent",
        children: [],
      },
      {
        title: "SEO",
        link: "/services/seo",
        component: "SEOComponent",
        children: [],
      },
    ],
  },
];

export default menuData;