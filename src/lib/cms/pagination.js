export const ADMIN_PAGE_SIZE = 10;

export function parsePageParam(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function paginate(items, page, pageSize = ADMIN_PAGE_SIZE) {
  const list = Array.isArray(items) ? items : [];
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);

  return {
    items: list.slice(start, end),
    page: currentPage,
    pageSize,
    total,
    totalPages,
    from: total === 0 ? 0 : start + 1,
    to: end,
  };
}

export function buildPageHref(pathname, page, searchParams = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value == null || value === "") continue;
    params.set(key, String(value));
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
