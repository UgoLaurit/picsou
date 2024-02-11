"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useDateSelect = (
  byYear = false,
  min?: { month: number; year: number },
  max?: { month: number; year: number },
): [number, number, () => void, () => void, () => void] => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("month", String(month));
    params.set("year", String(year));
    replace(`${pathname}?${params.toString()}`);
  }, [month, year]);

  const handleKeyPress = (event: { keyCode: number }) => {
    switch (event.keyCode) {
      case 37:
        previous();
        break;
      case 39:
        next();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const previous = () => {
    if (byYear) {
      if (year > 2015) {
        setMonth(0);
        setYear(year - 1);
      }
    } else {
      if (month === 1) {
        if (year > 2015) {
          setMonth(12);
          setYear(year - 1);
        }
      } else if (
        min
          ? year > min?.year || (month > min?.month && year === min?.year)
          : true
      ) {
        setMonth(month - 1);
        setYear(year);
      }
    }
  };

  const next = () => {
    if (byYear) {
      setMonth(0);
      setYear(year + 1);
    } else {
      if (max ? month === 12 && year < max?.year : month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else if (
        max
          ? year < max?.year || (month < max?.month && year === max?.year)
          : true
      ) {
        setMonth(month + 1);
        setYear(year);
      }
    }
  };

  const goToPresent = () => {
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
  };

  return [month, year, previous, next, goToPresent];
};
