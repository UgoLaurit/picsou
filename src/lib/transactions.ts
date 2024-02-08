import { type ChartData, type Node } from "~/types/chart-data";
import { type Transaction } from "~/types/transaction";
import { type Subcategory } from "~/types/subcategory";

export const getIncomesChartData = (
  transactions: Transaction[],
  subcategories: Subcategory[],
) => {
  const incomesTransactions = transactions.filter(
    (transaction) => transaction.value > 0,
  );

  return formatChartData(incomesTransactions, subcategories);
};

export const getExpensesChartData = (
  transactions: Transaction[],
  subcategories: Subcategory[],
) => {
  const expensesTransactions = transactions.filter(
    (transaction) => transaction.value < 0,
  );

  return formatChartData(expensesTransactions, subcategories);
};

const formatChartData = (
  transactions: Transaction[],
  subcategories: Subcategory[],
): ChartData => {
  const chartData: ChartData = {
    name: "Transactions",
    children: [],
  };

  // Group transactions by category and subcategory
  const categoryMap: Map<string, Node> = new Map();

  transactions.forEach((transaction) => {
    const { subcategory, value } = transaction;
    const subcategoryInfo = subcategories.find(
      (sub) => sub.id === subcategory.id,
    );

    if (subcategoryInfo) {
      const { category } = subcategoryInfo;
      const categoryId = category.id;
      const subcategoryId = subcategory.id;

      if (!categoryMap.has(categoryId)) {
        // Create a new category node
        const categoryNode: Node = {
          name: category.name,
          color: category.color,
          children: [],
        };
        categoryMap.set(categoryId, categoryNode);
      }

      // Get or create the subcategory node
      const categoryNode = categoryMap.get(categoryId);
      if (categoryNode) {
        let subcategoryNode = categoryNode.children?.find(
          (child) => child.name === subcategory.name,
        );
        if (!subcategoryNode) {
          subcategoryNode = {
            name: subcategory.name,
            children: [],
            value: 0,
          };
          categoryNode.children?.push(subcategoryNode);
        }

        // Increment the value of the subcategory node
        subcategoryNode.value = (subcategoryNode.value || 0) + value;
      }
    }
  });

  // Convert category map to array and set it as children of chartData
  categoryMap.forEach((categoryNode) => {
    chartData.children.push(categoryNode);
  });

  return chartData;
};
