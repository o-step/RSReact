import React from 'react';
import { createArrOfPages } from '../../utils/card';

export interface IPagination {
  initialDrawingPage: number;
  curPage: number;
  setCurPage: (page: number) => void;
  handleDrawPagePrev: () => void;
  handleDrawPageNext: () => void;
}

export function Pagination(props: IPagination) {
  const { initialDrawingPage, curPage, setCurPage, handleDrawPagePrev, handleDrawPageNext } = props;
  return (
    <>
      <a className="page-link" onClick={handleDrawPagePrev}>
        prev
      </a>
      {createArrOfPages(initialDrawingPage).map((page, index) => (
        <a
          className={`page-link ${page + 1 === curPage ? 'cur-page' : ''}`}
          onClick={() => setCurPage(page + 1)}
          key={index}
        >
          {page + 1}
        </a>
      ))}
      <a className="page-link" onClick={handleDrawPageNext}>
        next
      </a>
    </>
  );
}
