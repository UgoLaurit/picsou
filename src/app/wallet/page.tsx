import Wallet from "~/app/wallet/wallet";
import { getAllBankAccounts } from "~/actions/account";

const WalletPage = async () => {
  const bankAccounts = await getAllBankAccounts();

  return (
    <>
      {bankAccounts.map((account) => (
        <Wallet key={account.id} accountId={account.id} />
      ))}
    </>
  );
};

export default WalletPage;
