export type SimulationIconProps = {
  iconColor?: string;
};

export const SimulationIcon = ({
  iconColor = "#d8dee9",
}: SimulationIconProps) => {
  return (
    <>
      <svg width="26px" height="26px" viewBox="0 0 24 24">
        <path
          fill={iconColor}
          d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8l6.5 3.78Z"
        ></path>
      </svg>
    </>
  );
};
