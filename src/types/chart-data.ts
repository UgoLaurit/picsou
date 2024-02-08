export type Node = {
  name: string;
  color?: string;
  value?: number;
  children?: Node[];
};

export type ChartData = {
  name: string;
  children: Node[];
};
