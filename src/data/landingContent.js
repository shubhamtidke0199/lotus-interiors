export const productFilters = ["ALL", "LIVING ROOM", "BEDROOM", "KITCHEN", "OFFICE"];

export const portfolioFilters = [
  "LIVING ROOM",
  "BEDROOM",
  "KITCHEN",
  "OFFICE",
];

const portfolioImageLeft = {
  image: "/images/portfolio/project-left.webp",
  imageClassName: "absolute inset-0 size-full max-w-none object-cover",
};

const portfolioImageCenter = {
  image: "/images/portfolio/project-center.webp",
  imageClassName: "absolute inset-0 size-full max-w-none object-cover",
};

const portfolioImageRight = {
  image: "/images/portfolio/project-right.webp",
  imageClassName:
    "absolute left-[-16.62%] top-[0.43%] h-full w-[133.33%] max-w-none object-cover",
};

export const portfolioProjects = [
  // Living Room
  {
    id: "living-lotus-hq",
    category: "Commercial",
    filter: "LIVING ROOM",
    title: "Lotus Studio HQ",
    location: "Pune, India — 2026",
    ...portfolioImageLeft,
  },
  {
    id: "living-obsidian",
    category: "Residential",
    filter: "LIVING ROOM",
    title: "Obsidian Residence",
    location: "Mumbai, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "living-aether",
    category: "Hospitality",
    filter: "LIVING ROOM",
    title: "Aether Lounge",
    location: "Nagpur, India — 2025",
    ...portfolioImageRight,
  },
  {
    id: "living-saffron",
    category: "Residential",
    filter: "LIVING ROOM",
    title: "Saffron Living Suite",
    location: "Pune, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "living-ivory-hall",
    category: "Residential",
    filter: "LIVING ROOM",
    title: "Ivory Hall",
    location: "Mumbai, India — 2024",
    ...portfolioImageLeft,
  },
  {
    id: "living-marina-lounge",
    category: "Hospitality",
    filter: "LIVING ROOM",
    title: "Marina Lounge",
    location: "Pune, India — 2024",
    ...portfolioImageRight,
  },
  {
    id: "living-northline-salon",
    category: "Commercial",
    filter: "LIVING ROOM",
    title: "Northline Salon",
    location: "Nagpur, India — 2026",
    ...portfolioImageCenter,
  },
  {
    id: "living-petal-court",
    category: "Residential",
    filter: "LIVING ROOM",
    title: "Petal Court Living",
    location: "Pune, India — 2025",
    ...portfolioImageLeft,
  },
  {
    id: "living-obsidian-ii",
    category: "Residential",
    filter: "LIVING ROOM",
    title: "Obsidian Residence II",
    location: "Mumbai, India — 2026",
    ...portfolioImageCenter,
  },
  {
    id: "living-aether-ii",
    category: "Hospitality",
    filter: "LIVING ROOM",
    title: "Aether Lounge II",
    location: "Nagpur, India — 2024",
    ...portfolioImageRight,
  },

  // Bedroom
  {
    id: "bedroom-obsidian",
    category: "Residential",
    filter: "BEDROOM",
    title: "Obsidian Master Suite",
    location: "Mumbai, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "bedroom-lotus",
    category: "Commercial",
    filter: "BEDROOM",
    title: "Lotus Guest Wing",
    location: "Pune, India — 2026",
    ...portfolioImageLeft,
  },
  {
    id: "bedroom-aether",
    category: "Hospitality",
    filter: "BEDROOM",
    title: "Aether Suite",
    location: "Nagpur, India — 2025",
    ...portfolioImageRight,
  },
  {
    id: "bedroom-amber",
    category: "Residential",
    filter: "BEDROOM",
    title: "Amber Retreat",
    location: "Mumbai, India — 2024",
    ...portfolioImageLeft,
  },
  {
    id: "bedroom-saffron",
    category: "Residential",
    filter: "BEDROOM",
    title: "Saffron Chamber",
    location: "Pune, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "bedroom-marina",
    category: "Hospitality",
    filter: "BEDROOM",
    title: "Marina Suite",
    location: "Mumbai, India — 2026",
    ...portfolioImageRight,
  },
  {
    id: "bedroom-petal",
    category: "Residential",
    filter: "BEDROOM",
    title: "Petal Court Bedroom",
    location: "Nagpur, India — 2024",
    ...portfolioImageLeft,
  },
  {
    id: "bedroom-northline",
    category: "Commercial",
    filter: "BEDROOM",
    title: "Northline Guest Room",
    location: "Pune, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "bedroom-obsidian-ii",
    category: "Residential",
    filter: "BEDROOM",
    title: "Obsidian Suite II",
    location: "Mumbai, India — 2024",
    ...portfolioImageRight,
  },
  {
    id: "bedroom-lotus-ii",
    category: "Commercial",
    filter: "BEDROOM",
    title: "Lotus Guest Wing II",
    location: "Pune, India — 2026",
    ...portfolioImageLeft,
  },

  // Kitchen
  {
    id: "kitchen-lotus",
    category: "Commercial",
    filter: "KITCHEN",
    title: "Lotus Test Kitchen",
    location: "Pune, India — 2026",
    ...portfolioImageRight,
  },
  {
    id: "kitchen-obsidian",
    category: "Residential",
    filter: "KITCHEN",
    title: "Obsidian Culinary Studio",
    location: "Mumbai, India — 2025",
    ...portfolioImageLeft,
  },
  {
    id: "kitchen-aether",
    category: "Hospitality",
    filter: "KITCHEN",
    title: "Aether Pantry",
    location: "Nagpur, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "kitchen-saffron",
    category: "Residential",
    filter: "KITCHEN",
    title: "Saffron Kitchen",
    location: "Pune, India — 2024",
    ...portfolioImageLeft,
  },
  {
    id: "kitchen-marina",
    category: "Hospitality",
    filter: "KITCHEN",
    title: "Marina Culinary Bay",
    location: "Mumbai, India — 2026",
    ...portfolioImageRight,
  },
  {
    id: "kitchen-petal",
    category: "Residential",
    filter: "KITCHEN",
    title: "Petal Court Kitchen",
    location: "Nagpur, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "kitchen-northline",
    category: "Commercial",
    filter: "KITCHEN",
    title: "Northline Staff Kitchen",
    location: "Pune, India — 2024",
    ...portfolioImageLeft,
  },
  {
    id: "kitchen-amber",
    category: "Residential",
    filter: "KITCHEN",
    title: "Amber Galley",
    location: "Mumbai, India — 2025",
    ...portfolioImageRight,
  },
  {
    id: "kitchen-lotus-ii",
    category: "Commercial",
    filter: "KITCHEN",
    title: "Lotus Test Kitchen II",
    location: "Pune, India — 2026",
    ...portfolioImageCenter,
  },
  {
    id: "kitchen-aether-ii",
    category: "Hospitality",
    filter: "KITCHEN",
    title: "Aether Pantry II",
    location: "Nagpur, India — 2024",
    ...portfolioImageLeft,
  },

  // Office
  {
    id: "office-lotus",
    category: "Commercial",
    filter: "OFFICE",
    title: "Lotus Studio HQ",
    location: "Pune, India — 2026",
    ...portfolioImageLeft,
  },
  {
    id: "office-obsidian",
    category: "Residential",
    filter: "OFFICE",
    title: "Obsidian Study",
    location: "Mumbai, India — 2025",
    ...portfolioImageCenter,
  },
  {
    id: "office-aether",
    category: "Hospitality",
    filter: "OFFICE",
    title: "Aether Workspace",
    location: "Nagpur, India — 2025",
    ...portfolioImageRight,
  },
  {
    id: "office-northline",
    category: "Commercial",
    filter: "OFFICE",
    title: "Northline Executive Floor",
    location: "Pune, India — 2024",
    ...portfolioImageCenter,
  },
  {
    id: "office-marina",
    category: "Commercial",
    filter: "OFFICE",
    title: "Marina Boardroom",
    location: "Mumbai, India — 2026",
    ...portfolioImageLeft,
  },
  {
    id: "office-saffron",
    category: "Residential",
    filter: "OFFICE",
    title: "Saffron Home Office",
    location: "Pune, India — 2025",
    ...portfolioImageRight,
  },
  {
    id: "office-petal",
    category: "Residential",
    filter: "OFFICE",
    title: "Petal Court Study",
    location: "Nagpur, India — 2024",
    ...portfolioImageCenter,
  },
  {
    id: "office-amber",
    category: "Commercial",
    filter: "OFFICE",
    title: "Amber Atelier Desk",
    location: "Mumbai, India — 2025",
    ...portfolioImageLeft,
  },
  {
    id: "office-lotus-ii",
    category: "Commercial",
    filter: "OFFICE",
    title: "Lotus Studio Annex",
    location: "Pune, India — 2026",
    ...portfolioImageRight,
  },
  {
    id: "office-aether-ii",
    category: "Hospitality",
    filter: "OFFICE",
    title: "Aether Workspace II",
    location: "Nagpur, India — 2025",
    ...portfolioImageCenter,
  },
];

export const products = [
  {
    id: "arc-dining-table",
    name: "Monolith Dining Table",
    material: "Light Oak / Hand-Carved",
    price: "Rs. 4,25,000",
    category: "LIVING ROOM",
    image: "/images/products/monolith-dining-table.webp",
    imageClassName:
      "absolute left-0 h-[114.29%] w-full max-w-none -top-[21%] object-cover",
  },
  {
    id: "oslo-modular-sofa",
    name: "Velvet Shell Chair",
    material: "Lavender Silk Velvet",
    price: "Rs. 1,89,000",
    category: "LIVING ROOM",
    image: "/images/products/velvet-shell-chair.webp",
    imageClassName:
      "absolute left-0 h-[105.13%] w-full max-w-none -top-[5%] object-cover",
  },
  {
    id: "artisan-floating-bed",
    name: "Horizon Storage Bed",
    material: "American Walnut",
    price: "Rs. 5,40,000",
    category: "BEDROOM",
    image: "/images/products/horizon-storage-bed.webp",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
  {
    id: "infinity-wardrobe-system",
    name: "Linear Wardrobe",
    material: "Brushed Steel / Glass",
    price: "Rs. 7,80,000",
    category: "BEDROOM",
    image: "/images/products/linear-wardrobe.webp",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
  {
    id: "directors-workstation",
    name: "Director's Workstation",
    material: "Italian Leather / Oak",
    price: "Rs. 4,25,000",
    category: "OFFICE",
    image: "/images/products/monolith-dining-table-2.webp",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
  {
    id: "cloud-lounge-display",
    name: "Velvet Shell Chair",
    material: "Lavender Silk Velvet",
    price: "Rs. 1,89,000",
    category: "LIVING ROOM",
    image: "/images/products/velvet-shell-chair-2.webp",
    imageClassName:
      "absolute left-0 h-[117.73%] w-full max-w-none -top-[17.71%] object-cover",
    href: "/products/oslo-modular-sofa",
  },
  {
    id: "zenith-nightstand-display",
    name: "Horizon Storage Bed",
    material: "American Walnut",
    price: "Rs. 5,40,000",
    category: "BEDROOM",
    image: "/images/products/horizon-storage-bed-2.webp",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
    href: "/products/artisan-floating-bed",
  },
  {
    id: "linear-library-unit",
    name: "Linear Library Unit",
    material: "Brushed Steel / Glass",
    price: "Rs. 7,80,000",
    category: "KITCHEN",
    image: "/images/products/linear-wardrobe-2.webp",
    imageClassName: "absolute inset-0 size-full max-w-none object-cover",
  },
];

export const valueProps = [
  {
    number: "01",
    title: "Customized Designs",
    description:
      "We create interiors tailored to your lifestyle, space, and preferences.",
  },
  {
    number: "02",
    title: "End-to-End Solutions",
    description:
      "From concept to execution, we handle the complete project smoothly.",
  },
  {
    number: "03",
    title: "Experienced Design Team",
    description:
      "Our skilled designers ensure creative, practical, and modern interiors.",
  },
  {
    number: "04",
    title: "Quality Workmanship",
    description:
      "We focus on high-quality materials and detailed finishing in every project.",
  },
  {
    number: "05",
    title: "On-Time Project Delivery",
    description: "We ensure projects are completed within the promised timeline.",
  },
  {
    number: "06",
    title: "Transparent Process",
    description:
      "Clear communication and proper planning at every stage of the project.",
  },
];

export const locations = [
  {
    city: "MUMBAI",
    stores: "3 Studios",
    image: "/images/presence/mumbai.webp",
    imageClassName: "size-full object-cover object-center",
    overlayClassName: "location-card-overlay-mumbai",
  },
  {
    city: "PUNE",
    stores: "3 Studios",
    image: "/images/presence/pune.webp",
    imageClassName: "size-full object-cover object-center",
    overlayClassName: "location-card-overlay-pune",
  },
  {
    city: "NAGPUR",
    stores: "3 Studios",
    image: "/images/locations/nagpur.webp",
    imageClassName:
      "absolute -left-[36.13%] h-full w-[180.63%] max-w-none object-cover",
    overlayClassName: "location-card-overlay-nagpur",
  },
];

export const testimonials = [
  {
    quote:
      "Lotus Design Studio doesn't just design spaces; they choreograph emotions. Walking into our new home feels like a curated gallery experience every single day.",
    author: "Julianne & Marc Vanhoutten",
    role: "The Obsidian Penthouse Owners",
  },
  {
    quote:
      "From the first consultation to the final reveal, every detail felt intentional. Our office now reflects the calm clarity we wanted for our team.",
    author: "Ananya Deshmukh",
    role: "Founder, Northline Collective",
  },
  {
    quote:
      "They balanced beauty with practicality perfectly. Timelines were clear, materials were honest, and the finished interiors still feel fresh years later.",
    author: "Rohan & Meera Kapoor",
    role: "Private Residence, Pune",
  },
];

export const footerColumns = [
  {
    title: "Philosophy",
    links: [
      { label: "Curation", href: "/about-us#curation" },
      { label: "Integrity", href: "/about-us#integrity" },
      { label: "Sustainability", href: "/about-us#sustainability" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Shop All", href: "/products" },
      { label: "Locations", href: "/#presence" },
      { label: "Services", href: "/services" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "Book Appointment", href: "/contact" },
    ],
  },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Press Kit", href: "/press" },
];

export const studioContact = {
  email: "hello@lotusdesignstudio.com",
  phoneDisplay: "+91 98345 67890",
  phoneHref: "tel:+919834567890",
  address: "Nagpur · Mumbai · Pune",
};
