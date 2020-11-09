function getHexColor(color) {
  switch (color.toLowerCase()) {
    case "rood":
      return "#B22222";
    case "blauw":
      return "#1E90FF";
    case "zwart":
      return "#222222";
    case "grijs":
      return "#A9A9A9";
    case "wit":
      return "#F8F8FF";
    default:
      return "#D3D3D380";
  }
}

export default getHexColor;
