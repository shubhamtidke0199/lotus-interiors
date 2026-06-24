export const services = [
  {
    id: "residence",
    title: "RESIDENCE DESIGN",
    image: "/images/services/residence.webp",
    imageAlt: "Residential interior design service",
    imageClassName:
      "absolute left-0 h-[125%] w-full max-w-none -top-[29%] object-cover",
    overlayClassName: "left-[18px] w-[314px]",
    labelAlign: "left",
    lines: ["RESIDENCE DESIGN"],
  },
  {
    id: "commercial",
    title: "COMMERCIAL DESIGN",
    image: "/images/services/commercial.webp",
    imageAlt: "Commercial interior design service",
    imageClassName: "absolute -left-2 inset-y-0 h-full w-[504px] max-w-none object-cover",
    overlayClassName: "left-[26px] w-[345px]",
    labelAlign: "center",
    lines: ["COMMERCIAL DESIGN"],
    tall: true,
  },
  {
    id: "hospital",
    title: "HOSPITAL DESIGN",
    image: "/images/services/hospital.webp",
    imageAlt: "Hospital interior design service",
    imageClassName:
      "absolute left-0 h-full w-[100.06%] max-w-none -top-[37%] object-cover",
    overlayClassName: "left-[18px] w-[299px]",
    labelAlign: "center",
    lines: ["HOSPITAL DESIGN"],
  },
  {
    id: "consultancy",
    title: "DESIGN CONSULTANCY",
    image: "/images/services/consultancy.webp",
    imageAlt: "Design consultancy service",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
    overlayClassName: "left-[13px] w-[358px]",
    labelAlign: "center",
    lines: ["DESIGN CONSULTANCY"],
  },
  {
    id: "furniture",
    title: "CUSTOMIZED FURNITURE DESIGN & RETAIL",
    image: "/images/services/furniture.webp",
    imageAlt: "Customized furniture design and retail service",
    imageClassName: "absolute left-0 top-0 size-[690px] max-w-none object-cover",
    overlayClassName: "left-[18px] w-[382px]",
    labelAlign: "left",
    lines: ["CUSTOMIZED FURNITURE", "DESIGN & RETAIL"],
    multiline: true,
  },
  {
    id: "project-management",
    title: "PROJECT MANAGEMENT",
    image: "/images/services/project-management.webp",
    imageAlt: "Interior project management service",
    imageClassName:
      "absolute left-0 h-full w-full max-w-none -top-[0.02%] object-cover",
    overlayClassName: "left-6 w-[365px]",
    labelAlign: "center",
    lines: ["PROJECT MANAGEMENT"],
  },
];

export const servicesById = Object.fromEntries(
  services.map((service) => [service.id, service]),
);
