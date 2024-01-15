export type FormattedLabelProps = {
  label: string;
};

export const FormattedLabel = ({ label }: FormattedLabelProps) => {
  return (
    <>
      <div className="truncate w-96">{label}</div>
    </>
  );
};
