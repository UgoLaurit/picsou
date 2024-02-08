import BankSelect from "~/app/_components/header/bank-select";
import OwnerSelect from "~/app/_components/header/owner-select";
import DateSelect from "~/app/_components/header/month-select";

const HeaderBar = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-8 border-b px-12 py-4">
      <div className="flex flex-row gap-8">
        <OwnerSelect />
        <BankSelect />
      </div>

      <DateSelect />
    </div>
  );
};

export default HeaderBar;
