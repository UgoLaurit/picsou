// import BankSelect from "~/app/_components/header/bank-select";
import OwnerSelect from "~/app/_components/header/owner-select";
import DateSelect from "~/app/_components/header/month-select";
import { getAllOwners } from "~/actions/owner";

const HeaderBar = async () => {
  const owners = await getAllOwners();

  return (
    <div className="flex w-full flex-row items-center justify-between gap-8 border-b px-12 py-4">
      <div className="flex flex-row gap-8">
        <OwnerSelect owners={owners} />
        {/*<BankSelect />*/}
      </div>

      <DateSelect />
    </div>
  );
};

export default HeaderBar;
