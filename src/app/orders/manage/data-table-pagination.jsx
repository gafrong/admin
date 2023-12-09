"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

const ButtonGotoPage = ({ table, pageIndex, isActive = false }) => (
  <Button
    variant={isActive ? "" : "outline"}
    size="sm"
    onClick={() => table.setPageIndex(pageIndex)}
  >
    <span className="w-5 h-5">{pageIndex + 1}</span>
  </Button>
);

const ButtonGotoPreviousPage = ({ table }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    <CaretLeftIcon className="w-5 h-5" />
  </Button>
);

const ButtonGotoNextPage = ({ table }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    <CaretRightIcon className="w-5 h-5" />
  </Button>
);

const Elipsis = () => (
  <div
    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 bg-background hover:text-accent-foreground h-9 px-3
  "
  >
    <span className="w-99999 h-5 border-off border-red-500-off">...</span>
  </div>
);

// const CountProductsSelected = ({ table }) => (
//   <div className="flex-1 text-sm text-muted-foreground">
//     {table.getFilteredSelectedRowModel().rows.length} of{" "}
//     {table.getFilteredRowModel().rows.length} products(s) selected.
//   </div>
// );

// show the correct number of pagination buttons and page numbers on the buttons according to number of pages and current page
const getDisplayedButtons = (pageIndexCurrent, pageIndexLast) => {
  let defaultButtonGroup = [-2, -1, 0, 1, 2];
  let buttonGroup = defaultButtonGroup;

  // if there are less than 4 pages, show available buttons
  // ------------------------------------
  pageIndexLast === 0 && (buttonGroup = [0]);
  pageIndexLast === 1 && (buttonGroup = [0, 1]);
  pageIndexLast === 2 && (buttonGroup = [0, 1, 2]);
  pageIndexLast === 3 && (buttonGroup = [0, 1, 2, 3]);
  if (pageIndexLast < 4) {
    return buttonGroup;
  }

  // handle early pages
  // ------------------------------------
  pageIndexCurrent === 3 && (buttonGroup = [-3, -2, -1, 0, 1, 2]);
  pageIndexCurrent === 2 && (buttonGroup = [-2, -1, 0, 1, 2]);
  pageIndexCurrent === 1 && (buttonGroup = [-1, 0, 1, 2, 3]);
  pageIndexCurrent === 0 && (buttonGroup = [0, 1, 2, 3, 4]);

  // handle last pages
  // ------------------------------------
  const pagesToLastPage = pageIndexLast - pageIndexCurrent;
  pagesToLastPage === 0 && (buttonGroup = [-4, -3, -2, -1, 0]);
  pagesToLastPage === 1 && (buttonGroup = [-3, -2, -1, 0, 1]);
  pagesToLastPage === 2 && (buttonGroup = [-2, -1, 0, 1, 2]);
  pagesToLastPage === 3 && (buttonGroup = [-1, 0, 1, 2, 3]);

  return buttonGroup;
};

const JumpToFirstPage = ({ table, pageIndexFirst }) => (
  <>
    <ButtonGotoPage table={table} pageIndex={pageIndexFirst} />
    <Elipsis />
  </>
);

const JumpToLastPage = ({ table, pageIndexLast }) => (
  <>
    <Elipsis />
    <ButtonGotoPage table={table} pageIndex={pageIndexLast} />
  </>
);

export const DataTablePagination = ({ table }) => {
  const { pageIndex } = table.getState().pagination;
  const pageIndexCurrent = pageIndex;
  const pageIndexLast = table.getPageCount() - 1;
  const pageIndexFirst = 0;

  const getValidPages = (offset) => {
    const pageNumber = pageIndexCurrent + offset;
    return pageNumber >= 0 && pageNumber < pageIndexLast;
  };

  let displayedButtons = getDisplayedButtons(
    pageIndexCurrent,
    pageIndexLast
  ).filter(getValidPages);

  const isPagesShown = pageIndexLast !== -1;

  if (!isPagesShown) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* <CountProductsSelected  table={table}/> */}
      <div className="flex space-x-2">

        {/* left chevron */}
        <ButtonGotoPreviousPage table={table} />

        {pageIndexCurrent > 3 && (
          <JumpToFirstPage table={table} pageIndexFirst={pageIndexFirst} />
        )}
        {displayedButtons.map((i) => (
          <ButtonGotoPage
            table={table}
            key={"button-group-" + i}
            pageIndex={pageIndex + i}
            isActive={pageIndex + i === pageIndexCurrent}
          />
        ))}
        {pageIndexCurrent < pageIndexLast - 3 && (
          <JumpToLastPage table={table} pageIndexLast={pageIndexLast} />
        )}

        {/* right chevron */}
        <ButtonGotoNextPage table={table} />

      </div>
    </div>
  );
};
