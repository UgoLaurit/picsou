export type Node = {
  name: string;
  color?: string;
  value?: number;
  children?: Node[];
};

export type ExpensesChartData = {
  name: string;
  children: Node[];
};
