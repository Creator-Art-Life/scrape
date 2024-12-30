import { GetAvailableCredtis } from "@/actions/billing/getAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftRightIcon, CoinsIcon } from "lucide-react";
import { Suspense } from "react";
import CreditsPurchase from "./_components/creditsPurchase";
import { Period } from "@/types/analytics";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";
import CreditsUsageChart from "./_components/CreditUsageChart";
import { GetUserPurchaseHistory } from "@/actions/billing/getUserPurchaseHistory";
import TransBtn from "./_components/TransBtn";

export default function page() {
  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="h-[160px] w-full" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <CreditUsageCard />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <TransactionHistoryCard />
      </Suspense>
    </div>
  );
}

async function BalanceCard() {
  const userBalance = await GetAvailableCredtis();
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available Credits
            </h3>
            <p className="text-4xl font-bold text-primary">
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>
          <CoinsIcon
            size={140}
            className="text-primary opacity-20 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        When your credits balance reaches zero, your workflow will stop working
      </CardFooter>
    </Card>
  );
}

async function CreditUsageCard() {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const data = await GetCreditsUsageInPeriod(period);

  return (
    <CreditsUsageChart
      data={data}
      title="Credits consumed"
      description="Daily credit consumed in current month"
    />
  );
}

const fake_purchases = [
  {
    userId: "user_123",
    date: new Date("2024-12-30T10:00:00Z"),
    id: "payment_456",
    stripeId: "stripe_789",
    description: "Payment for subscription",
    amount: 1999,
    currency: "USD",
  },
  {
    userId: "user_124",
    date: new Date("2024-12-31T15:00:00Z"),
    id: "payment_457",
    stripeId: "stripe_790",
    description: "Payment for premium subscription",
    amount: 2999,
    currency: "EUR",
  },
];

async function TransactionHistoryCard() {
  const purchase = await GetUserPurchaseHistory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRightIcon className="h-6 w-6 text-primary" />
          Transition History
        </CardTitle>
        <CardDescription>
          View your transaction history and download invoices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TransBtn fake={fake_purchases} real={purchase} />
      </CardContent>
    </Card>
  );
}
