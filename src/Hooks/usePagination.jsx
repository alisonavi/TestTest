import React, { useState } from 'react'

export const usePagination = (items, pageLimit) => {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);

  const changePage = (pN) => {
    setPageNumber(pN);
  }

  const pageData = () => {
    const s = pageNumber * pageLimit;
    const e = s + pageLimit;
    return items.slice(s, e);
  }

  const nextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  }

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0))
  }

  return (
    {
      pageNumber,
      pageCount,
      changePage,
      pageData,
      nextPage,
      previousPage
    }
  )
}
