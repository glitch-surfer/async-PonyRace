export const getItemsOnPage = <T>(
  pageNumber: number,
  itemsOnPage: number,
  items: T[],
): T[] => {
  const result = [];

  for (let i = (pageNumber * itemsOnPage) - itemsOnPage; i < (pageNumber * itemsOnPage); i += 1) {
    if (items[i] === undefined) break;
    result.push(items[i]);
  }

  return result;
};
