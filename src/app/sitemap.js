export default function sitemap() {
  const base = "https://lotusdesignstudio.com";
  const routes = [
    "",
    "/about-us",
    "/services",
    "/portfolio",
    "/products",
    "/blogs",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/press",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
