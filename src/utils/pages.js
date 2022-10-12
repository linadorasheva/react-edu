export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const pagesArrayBuilder = (params) => {
  const pages = [];
  if (params.arrowPrev) {
    const page = {
      pageIndex: `pagination-arrow-prev`,
      pageNumber: 0,
      icon: true,
      iconClass: 'prev',
      action: 'clickPrev',
    };
    pages.push(page);
  }
  for (let i = 0; i < params.visiblePagesNumbers.length; i++) {
    const page = {
      pageIndex: `pagination-${params.visiblePagesNumbers[i]}`,
      pageNumber: params.visiblePagesNumbers[i],
      icon: false,
      iconClass: '',
      action: 'clickPage',
    };
    pages.push(page);
  }
  if (params.arrowNext) {
    const page = {
      pageIndex: `pagination-arrow-next`,
      pageNumber: 0,
      icon: true,
      iconClass: 'next',
      action: 'clickNext',
    };
    pages.push(page);
  }

  return pages;
};
