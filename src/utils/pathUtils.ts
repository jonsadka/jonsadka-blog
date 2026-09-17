export function numX(n: number, width: number, height: number) {
  return (
    Math.sqrt((width / height) * n + Math.pow(width - height, 2) / (4 * Math.pow(height, 2))) -
    (width - height) / (2 * height)
  );
}

export function getColor(color: string, opacity = 100) {
  switch (color) {
    case 'black':
      return `rgba(55, 65, 81, ${opacity}%)`;

    case 'blue':
      return `rgba(2, 0, 140, ${opacity}%)`;

    case 'red':
      return `rgba(199, 0, 1, ${opacity}%)`;

    default:
      return `rgba(0, 0, 0, ${opacity}%)`;
  }
}
