export const smallScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches;
export const mediumScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;
export const largeScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 1024px)").matches;
export const extraLargeScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 1280px)").matches;
export const extraExtraLargeScreen =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 1536px)").matches;
