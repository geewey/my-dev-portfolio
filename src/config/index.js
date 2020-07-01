module.exports = {
  author: "@geewey",
  siteTitle: "Gee-Wey Yue | Developer Portfolio",
  siteShortTitle: "GY | Dev Portfolio", // Used as logo text in header, footer, and splash screen
  siteDescription:
    "Gee-Wey of House Yue, First of His Name, Developer of Software, Engineer of Full-Stack, Solver of Coding Problems, Breaker of Bugs, & Disciple of Programming.",
  siteUrl: "https://geewey.com",
  siteLanguage: "en_US",
  siteIcon: "src/content/favicon2.png", // Relative to gatsby-config file

  splashScreen: false, // Set this to true if you want to use the splash screen

  // You can create your own Medium feed with this rss to json converter: https://rss2json.com/
  // To access your Medium RSS feed, just replace this url with your username: https://medium.com/feed/@{yourname}
  mediumRssFeed:
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40geewey",
  shownArticles: 3,

  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance
  socialMedia: [
    {
      name: "GitHub",
      url: "https://github.com/geewey/",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/geewey/",
    },
    {
      name: "Medium",
      url: "https://medium.com/@geewey",
    },
  ],

  navLinks: {
    menu: [
      {
        name: "About me",
        url: "/#about",
      },
      {
        name: "Projects",
        url: "/#projects",
      },
      {
        name: "Education",
        url: "/#education",
      },
      {
        name: "Blog",
        url: "/#blogposts",
      },
    ],
    button: {
      name: "Contact",
      url: "/#contact",
    },
  },

  footerLinks: [
    // {
    //   name: "Privacy",
    //   url: "/privacy",
    // },
    // {
    //   name: "Imprint",
    //   url: "/imprint",
    // },
  ],
}
