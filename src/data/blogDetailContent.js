import { blogPosts } from "@/data/blogsPageContent";

const defaultArticleBody = {
  intro:
    "Ever wonder why some homes look refined without trying too hard? That quiet confidence is the heart of old money interior design. Instead of flashy trends, this style focuses on quality, tradition, and spaces that feel collected over time.",
  sections: [
    {
      heading: "What is Old Money Style?",
      image: "/images/blog-view/header/header-img2.png",
      paragraphs: [
        "Old money style reflects quiet luxury and interiors that value heritage in design and restraint over showiness. The look often appears in long-established family homes such as historic estates and classic townhouses. However, the idea is not about wealth alone. It is about thoughtful choices that last for decades. In old money interior design, pieces are chosen mainly for their craftsmanship or history.",
        "Another important part of the old money decor style is balance. Artwork, books, and heirlooms sit beside practical items used every day. It's this mix that makes these elegant interiors feel so natural. Color palettes are also grounded, with muted hues and warm neutrals as a staple.",
      ],
    },
    {
      proTip:
        "Not sure if old money interior design is the best choice for you? Try our Free Interior Design Style Quiz to discover your ideal style today!",
    },
    {
      heading: "Key Characteristics of Old Money Interior Design",
      image: "/images/blog-view/header/header-img2.png",
      paragraphs: [
        "Certain design principles appear often in interiors inspired by old money home decor. While every space is unique, these elements shape the overall look.",
        "Quality materials with lasting finishes: Solid wood furniture, marble accents, wool rugs, and natural fabrics hold up for years and develop character with age.",
        "Architectural focus: Crown molding, wall paneling, fireplaces, and built-in cabinetry often form the backbone of an old money interior. These details create quiet refinement before furniture enters the room.",
        "Understated luxury: In old money style, expensive pieces rarely demand attention. Quality appears through craftsmanship and materials rather than bold display.",
        "Layered history with cultural influence: Many homes include inherited furniture, travel finds, libraries, and objects with meaning. This layered approach shapes authentic old money home decor.",
        "Timeless design: The old money style does not chase seasonal styles. Instead, it favors choices that remain relevant long after trends fade.",
        "Design consistency: Colors, materials, and finishes often repeat across rooms for a cohesive old money interior aesthetic.",
      ],
    },
  ],
};

const defaultBlogDetail = {
  title:
    "Old Money Interior Design and Home Decor: Creating Timeless, Subtle Luxury",
  category: "Decor Trends",
  date: "Sep 22, 2024",
  topic: "Style and guide",
  heroImage: "/images/blog-view/header/header-img1.png",
  body: defaultArticleBody,
};

const relatedStoryOverrides = {
  "warmth-in-modernity": {
    image: "/images/blog-view/article-img.png",
    imageClassName: "absolute inset-0 size-full object-cover",
  },
  "sculptural-object": {
    image: "/images/blog-view/article-2-shifted-img.png",
    imageClassName: "absolute inset-0 size-full object-cover",
    staggered: true,
  },
  "tactile-narratives": {
    image: "/images/blog-view/article-3-margin-img.png",
    imageClassName: "absolute inset-0 size-full object-cover",
  },
};

export function getBlogDetail(slug) {
  const post = blogPosts.find((item) => item.id === slug);
  if (!post) {
    return null;
  }

  return {
    slug,
    title: post.id === "intelligent-workspace" ? defaultBlogDetail.title : post.title,
    category:
      post.id === "intelligent-workspace" ? defaultBlogDetail.category : post.category,
    date: post.date,
    topic: defaultBlogDetail.topic,
    heroImage:
      post.id === "intelligent-workspace"
        ? defaultBlogDetail.heroImage
        : post.image,
    excerpt: post.excerpt,
    body: defaultArticleBody,
  };
}

export function getRelatedStories(currentSlug) {
  const preferred = ["warmth-in-modernity", "sculptural-object", "tactile-narratives"];

  return preferred
    .filter((id) => id !== currentSlug)
    .map((id) => {
      const post = blogPosts.find((item) => item.id === id);
      if (!post) {
        return null;
      }

      return {
        ...post,
        ...relatedStoryOverrides[id],
        href: `/blogs/${id}`,
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

export function getAllBlogSlugs() {
  return blogPosts.map((post) => post.id);
}
