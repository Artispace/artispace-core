export default width => {
  if (width === "xs" || width === "sm") return "sm";
  if (width === "md") return "md";
  return "lg";
};
