export type FormattedCategoryProps = {
  name: string;
  color: string;
};

export const FormattedCategory = ({ name, color }: FormattedCategoryProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className={"h-2 w-2 rounded-full"}
        style={{ backgroundColor: color }}
      ></div>
      <span>{name}</span>
    </div>
  );
};
