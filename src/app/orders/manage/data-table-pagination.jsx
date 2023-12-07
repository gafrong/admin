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
const getDisplayedButtons = (currentPage, PageIndexLast) => {
  let ButtonGroup = [-2, -1, 0, 1, 2];

  // if there are less than 4 pages, show available buttons
  // ------------------------------------
  PageIndexLast === 0 && (ButtonGroup = [0]);
  PageIndexLast === 1 && (ButtonGroup = [0, 1]);
  PageIndexLast === 2 && (ButtonGroup = [0, 1, 2]);
  PageIndexLast === 3 && (ButtonGroup = [0, 1, 2, 3]);
  if(PageIndexLast < 4) {
    return ButtonGroup
  }

  // handle early pages
  // ------------------------------------
  currentPage === 3 && (ButtonGroup = [-3, -2, -1, 0, 1, 2]);
  currentPage === 2 && (ButtonGroup = [-2, -1, 0, 1, 2]);
  currentPage === 1 && (ButtonGroup = [-1, 0, 1, 2, 3]);
  currentPage === 0 && (ButtonGroup = [0, 1, 2, 3, 4]);

  // handle last pages
  // ------------------------------------
  PageIndexLast - currentPage === 0 && (ButtonGroup = [-4, -3, -2, -1, 0]);
  PageIndexLast - currentPage === 1 && (ButtonGroup = [-3, -2, -1, 0, 1]);
  PageIndexLast - currentPage === 2 && (ButtonGroup = [-2, -1, 0, 1, 2]);
  PageIndexLast - currentPage === 3 && (ButtonGroup = [-1, 0, 1, 2, 3]);

  return ButtonGroup;
};

export const DataTablePagination = ({ table }) => {
  const { pageIndex } = table.getState().pagination;
  const PageIndexCurrent = pageIndex;
  const PageIndexLast = table.getPageCount() - 1;
  const PageIndexFirst = 0;
  let ButtonGroup = getDisplayedButtons(PageIndexCurrent, PageIndexLast);
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* <CountProductsSelected  table={table}/> */}
      <div className="flex space-x-2">
        <ButtonGotoPreviousPage table={table} />

        {PageIndexCurrent > 3 && (
          <>
            <ButtonGotoPage table={table} pageIndex={PageIndexFirst} />
            <Elipsis />
          </>
        )}

        {ButtonGroup.map((i) => (
          <ButtonGotoPage
            table={table}
            key={"button-group-" + i}
            pageIndex={pageIndex + i}
            isActive={pageIndex + i === PageIndexCurrent}
          />
        ))}

        {PageIndexCurrent < PageIndexLast - 3 && (
          <>
            <Elipsis />
            <ButtonGotoPage table={table} pageIndex={PageIndexLast} />
          </>
        )}

        <ButtonGotoNextPage table={table} />
      </div>
    </div>
  );
};
