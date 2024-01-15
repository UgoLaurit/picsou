export type LoansIconProps = {
  iconColor?: string;
};

export const LoansIcon = ({ iconColor = "#d8dee9" }: LoansIconProps) => {
  return (
    <>
      <svg width="26px" height="26px" viewBox="0 0 24 24">
        <path
          fill={iconColor}
          d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7H4Z"
        ></path>
      </svg>
    </>
  );
};
