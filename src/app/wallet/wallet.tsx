import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { FormattedValue } from "~/app/_components/format/formatted-value";
import { getBalance } from "~/actions/balance";

type WalletProps = {
  accountId: string;
};

const Wallet = async ({ accountId }: WalletProps) => {
  const balance = await getBalance(accountId);

  console.log(balance);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>LCL - Compte courant</CardTitle>
        {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
      </CardHeader>
      <CardContent className="flex flex-row justify-end">
        {balance ? (
          <FormattedValue className="text-2xl" value={balance.value} />
        ) : (
          "Missing balance"
        )}
      </CardContent>
    </Card>
  );
};

export default Wallet;
