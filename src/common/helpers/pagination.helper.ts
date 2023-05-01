function getSkipAndTake(page: number, pageSize = 12) {
  let skip = 0;
  let take = 0;

  if (page > 0) {
    skip = pageSize * (page - 1);
    take = pageSize;
  }

  return {
    skip,
    take,
  };
}

export const PaginationHelper = {
  getSkipAndTake,
};
