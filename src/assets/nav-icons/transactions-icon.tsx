export type TransactionsIconProps = {
  iconColor?: string;
};

export const TransactionsIcon = ({
  iconColor = "#d8dee9",
}: TransactionsIconProps) => {
  return (
    <>
      <svg width="26px" height="26px" viewBox="0 0 24 24">
        <path
          fill={iconColor}
          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 7H4V8h16Z"
        ></path>
      </svg>
    </>
  );
};
