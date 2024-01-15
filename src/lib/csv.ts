import { type TransactionDTO } from "~/types/transaction";
import { getAllSubcategories } from "~/actions/category";

export const parseCSV = async (
  csvInput: string,
): Promise<Omit<TransactionDTO, "bankAccountId">[]> => {
  const subcategories = await getAllSubcategories();

  const lines = csvInput.split("\n").slice(1);

  return lines.map((line) => {
    const [dateString, category, amount, notes] = line.split(";");

    const dateParts = dateString!.split(" ")[0]!.split("/");

    const subcategoryId = subcategories.find(
      (subcategory) => subcategory.name === category,
    )?.id;

    if (!subcategoryId) {
      throw new Error(`Subcategory ${category} not found`);
    }

    return {
      date: new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0]),
      ).toISOString(),
      label: notes ?? "",
      value: parseFloat(amount!),
      subcategoryId,
    };
  });
};
