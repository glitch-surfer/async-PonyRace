export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  const hexColorLength = 6;

  for (let i = 0; i < hexColorLength; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
