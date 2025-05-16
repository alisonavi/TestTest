import React, { useEffect } from 'react'
import { usePagination } from '../Hooks/usePagination'

export const Pagination = (props) => {
  const { pageNumber, changePage, previousPage, nextPage, pageCount, pageData } = usePagination(props.items, props.pageLimit);

  useEffect(() => {
    props.setPagePeople(pageData());
  }, [pageNumber, props.items.length]); // Also update when items change

  return (
    <div>
      <button onClick={previousPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
      <span> / {pageCount - 1}</span>
    </div>
  )
}
