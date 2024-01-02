"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect } from "react";

export type TableProps = {
  columns: any;
  data: any;
  className?: string;
};

export const Table = ({ columns, data, className }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row: any) => row.subcategories,
  });

  useEffect(() => {
    table.toggleAllRowsExpanded();
  }, []);

  return (
    <>
      <table className={`w-full text-left text-white ${className}`}>
        <thead className="sticky top-0 text-sm">
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((header, index) => (
                <th key={index} className="px-2 py-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm">
          {table.getRowModel().flatRows.map((row, index) => (
            <tr key={index}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={index} className="max-w-20 border-t px-2 py-1.5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0">
          {table.getFooterGroups().map((footerGroup, index) => (
            <tr key={index}>
              {footerGroup.headers.map((header, index) => (
                <th key={index} className="border-t pt-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};
