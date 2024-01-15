export const formatValue = (
  input: number,
  withDecimals = false,
  plusSign = true,
): string => {
  if (input > 0) {
    return (
      (plusSign ? "+ " : "") +
      input
        .toFixed(withDecimals ? 2 : 0)
        .toLocaleString()
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
      " €"
    );
  } else {
    return (
      input
        .toFixed(withDecimals ? 2 : 0)
        .toLocaleString()
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .replace("-", "- ") + " €"
    );
  }
};
