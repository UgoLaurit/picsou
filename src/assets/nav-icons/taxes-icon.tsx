export type TaxesIconProps = {
  iconColor?: string;
};

export const TaxesIcon = ({ iconColor = "#d8dee9" }: TaxesIconProps) => {
  return (
    <>
      <svg width="26px" height="26px" viewBox="0 0 24 24">
        <path
          fill={iconColor}
          d="M5 14h14v1H5v-1m16 3V8H3v9h18M1 5h22v14H1V5m4 5h7v2H5v-2Z"
        ></path>
      </svg>
    </>
  );
};
