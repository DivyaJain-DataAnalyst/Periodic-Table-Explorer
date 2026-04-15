const getBlockColor = (block) => {
  switch (block) {
    case "s":
      return "#7dd3fc"; // Sky blue for s-block
    case "p":
      return "#4ade80"; // Green for p-block
    case "d":
      return "#fbbf24"; // Amber for d-block
    case "f":
      return "#a78bfa"; // Purple for f-block
    default:
      return "#94a3b8"; // Slate for undefined blocks
  }
};

export default getBlockColor;