import { Skeleton } from "~/app/_components/ui/skeleton";

const LoadingTransactionsPage = () => {
  return (
    <div className="mt-16 flex w-full flex-col gap-8 p-4">
      <div className="flex w-full flex-row gap-24">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="flex flex-row gap-24">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="flex flex-row gap-24">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
};

export default LoadingTransactionsPage;
