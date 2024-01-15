import { type ComponentPropsWithoutRef } from "react";
import { formatValue } from "~/lib/money";

export type FormattedValueProps = {
  value: number;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

export const FormattedValue = ({
  value,
  className,
  ...props
}: FormattedValueProps) => {
  return (
    <>
      <div
        {...props}
        className={`whitespace-nowrap text-right ${
          value > 0 ? "text-aurora-400" : value < 0 ? "text-aurora-100" : ""
        } ${className}`}
      >
        {formatValue(value, true)}
      </div>
    </>
  );
};
