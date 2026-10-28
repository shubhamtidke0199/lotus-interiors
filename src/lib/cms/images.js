export const MAX_GALLERY_IMAGES = 5;
export const PRODUCT_IMAGES_BUCKET = "product-images";

export function normalizeGalleryImages(input, legacy = {}) {
  const fromArray = Array.isArray(input)
    ? input
    : Array.isArray(legacy.images)
      ? legacy.images
      : null;

  const source =
    fromArray ??
    [legacy.galleryTop, legacy.galleryBottom].filter((value) =>
      Boolean(String(value ?? "").trim()),
    );

  return [...new Set(source.map((value) => String(value ?? "").trim()).filter(Boolean))].slice(
    0,
    MAX_GALLERY_IMAGES,
  );
}

/** Extract object path inside the product-images bucket from a public URL. */
export function storagePathFromPublicUrl(url) {
  const value = String(url ?? "").trim();
  if (!value) return null;

  const markers = [
    `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`,
    `/storage/v1/object/sign/${PRODUCT_IMAGES_BUCKET}/`,
  ];

  for (const marker of markers) {
    const index = value.indexOf(marker);
    if (index === -1) continue;
    const path = value.slice(index + marker.length).split("?")[0];
    return path ? decodeURIComponent(path) : null;
  }

  return null;
}

export function isSupabaseStorageUrl(url) {
  return Boolean(storagePathFromPublicUrl(url));
}
