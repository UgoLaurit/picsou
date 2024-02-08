"use client";

import { type ComponentPropsWithoutRef } from "react";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { MONTHS } from "~/assets/constants";
import { useDateSelect } from "~/hooks/use-date-select";

export type DateSelectorProps = {
  byYear?: boolean;
  min?: { month: number; year: number };
  max?: { month: number; year: number };
} & ComponentPropsWithoutRef<"div">;

const DateSelect = ({
  byYear = false,
  min,
  max,
  ...props
}: DateSelectorProps) => {
  const [month, year, previous, next, goToPresent] = useDateSelect(byYear, min);

  return (
    <>
      <div
        {...props}
        className="mx-2 flex w-60 flex-row items-center justify-between py-1 text-lg"
      >
        <button className="outline-none" onClick={previous}>
          <MdArrowBackIos />
        </button>

        <button
          className="text-xl capitalize outline-none"
          onClick={goToPresent}
        >
          {byYear ? `${year}` : `${MONTHS[month]} ${year}`}
        </button>

        <button className="outline-none" onClick={next}>
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default DateSelect;
