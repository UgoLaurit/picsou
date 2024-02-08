"use client";

import { TableCell, TableRow } from "~/app/_components/table/table";
import { Skeleton } from "~/app/_components/ui/skeleton";

const SkeletonTableBody = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[500px]" />
          </TableCell>
          <TableCell className="flex flex-col items-end justify-end">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTableBody;
