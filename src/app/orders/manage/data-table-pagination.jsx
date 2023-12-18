"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

const ButtonGotoPage = ({ table, pageIndex, isActive }) => (
  <Button
    variant={isActive ? "" : "outline"}
    size="sm"
    onClick={() => table.setPageIndex(pageIndex)}
  >
    <span className="w-5 h-5 select-none">{pageIndex + 1}</span>
  </Button>
);

const ChevronGotoPreviousPage = ({ table }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    <CaretLeftIcon className="w-5 h-5 select-none" />
  </Button>
);

const ChevronGotoNextPage = ({ table }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    <CaretRightIcon className="w-5 h-5 select-none" />
  </Button>
);

const PageGap = () => (
  <div
    className="inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 bg-background hover:text-accent-foreground h-9 px-3
  "
  >
    <span className="w-5 h-5 select-none">...</span>
  </div>
);

const CountProductsSelected = ({ table }) => (
  <div className="flex-1 text-sm text-muted-foreground">
    {table.getFilteredSelectedRowModel().rows.length} of{" "}
    {table.getFilteredRowModel().rows.length} products(s) selected.
  </div>
);

const getValidPages = (offset) => {
  const pageNumber = pageIndexCurrent + offset;
  return pageNumber >= 0 && pageNumber <= pageIndexLast;
};

// show the correct number of pagination buttons and page numbers on the buttons according to number of pages and current page
const getDisplayedButtonOffsets = (pageIndexCurrent, pageIndexLast) => {
  const defaultDisplayedButtonOffsets = [-2, -1, 0, 1, 2];
  const pagesToLastPage = pageIndexLast - pageIndexCurrent;

  const displayedButtonOffsets =
    // handle first pages
    pageIndexCurrent === 1 ? [-1, 0, 1, 2, 3]
    : pageIndexCurrent === 0 ? [0, 1, 2, 3, 4]
      // handle last pages
    : pagesToLastPage === 0 ? [-4, -3, -2, -1, 0]
    : pagesToLastPage === 1 ? [-3, -2, -1, 0, 1]
    : defaultDisplayedButtonOffsets;

  return displayedButtonOffsets.filter(getValidPages);
};

const ButtonJumpToFirstPage = ({
  displayedButtonOffsets,
  isActive,
  pageIndexCurrent,
  pageIndexFirst,
  table,
}) => {
  const offsetFirstButtonGroup = displayedButtonOffsets.slice(0, 1)[0];
  const pageIndexFirstButtonGroup = offsetFirstButtonGroup + pageIndexCurrent;
  const isJumpToFirstPageButtonShown = pageIndexFirstButtonGroup > 0;
  const isPageGapShown = pageIndexFirstButtonGroup > 1;
  if (!isJumpToFirstPageButtonShown) return null;
  return (
    <>
      {isJumpToFirstPageButtonShown && (
        <ButtonGotoPage
          table={table}
          pageIndex={pageIndexFirst}
          isActive={isActive}
        />
      )}
      {isPageGapShown && <PageGap />}
    </>
  );
};

const ButtonJumpToLastPage = ({
  displayedButtons,
  isActive,
  pageIndexCurrent,
  pageIndexLast,
  table,
}) => {
  const offsetLastButtonGroup = displayedButtons.slice(-1)[0];
  const pageIndexLastButtonGroup = offsetLastButtonGroup + pageIndexCurrent;
  const isJumpToLastPageButtonShown = pageIndexLastButtonGroup !== pageIndexLast;
  const isPageGapShown = pageIndexLastButtonGroup !== pageIndexLast - 1;
  if (!isJumpToLastPageButtonShown) return null;
  return (
    <>
      {isPageGapShown && <PageGap />}
      {isJumpToLastPageButtonShown && (
        <ButtonGotoPage
          table={table}
          pageIndex={pageIndexLast}
          isActive={isActive}
        />
      )}
    </>
  );
};

export const DataTablePagination = ({ table }) => {
  const { pageIndex } = table.getState().pagination;
  const pageIndexCurrent = pageIndex;
  const pageIndexLast = table.getPageCount() - 1;
  const pageIndexFirst = 0;

  const displayedButtonOffsets = getDisplayedButtonOffsets(
    pageIndexCurrent,
    pageIndexLast,
  );

  const isPageAvailable = pageIndexLast !== -1;

  if (!isPageAvailable) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-5 items-center justify-center space-x-2 py-4">
      <CountProductsSelected table={table} />
      <div className="flex space-x-2">

        <ChevronGotoPreviousPage table={table} />

        <ButtonJumpToFirstPage
          displayedButtonOffsets={displayedButtonOffsets}
          isActive={pageIndexFirst === pageIndexCurrent}
          pageIndexCurrent={pageIndexCurrent}
          pageIndexFirst={pageIndexFirst}
          table={table}
        />

        {displayedButtonOffsets.map((i) => (
          <ButtonGotoPage
            table={table}
            key={"button-group-" + i}
            pageIndex={pageIndex + i}
            isActive={pageIndex + i === pageIndexCurrent}
          />
        ))}

        <ButtonJumpToLastPage
          displayedButtons={displayedButtonOffsets}
          isActive={pageIndexLast === pageIndexCurrent}
          pageIndexCurrent={pageIndexCurrent}
          pageIndexLast={pageIndexLast}
          table={table}
        />

        <ChevronGotoNextPage table={table} />

      </div>
    </div>
  );
};
