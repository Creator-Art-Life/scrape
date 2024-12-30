"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Purchase, StatusHistoryTrans } from "@/types/billing";
import React, { useState } from "react";
import InvoiceBtn from "./InvoiceBtn";

interface TransBtnProps {
  fake: Purchase[];
  real: Purchase[];
}

export default function TransBtn({ fake, real }: TransBtnProps) {
  const [selectedPack, setSelectedPack] = useState<StatusHistoryTrans>(
    StatusHistoryTrans.REAL
  );

  const purchases = selectedPack === StatusHistoryTrans.REAL ? real : fake;
  return (
    <div className="rounded">
      <RadioGroup
        onValueChange={(value) => setSelectedPack(value as StatusHistoryTrans)}
        value={selectedPack}
        className="flex space-x-4 mb-4  bg-secondary/50 rounded-lg p-3 hover:bg-secondary h-10"
      >
        <RadioGroupItem value={StatusHistoryTrans.REAL} id="real" />
        <Label htmlFor="real" className="cursor-pointer">
          Real transaction
        </Label>

        <RadioGroupItem value={StatusHistoryTrans.FAKE} id="fake" />
        <Label htmlFor="fake" className="cursor-pointer">
          Example transaction
        </Label>
      </RadioGroup>
      <div>
        {purchases.length === 0 && (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-2xl text-muted-foreground">No transaction yet</p>
          </div>
        )}
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex justify-between items-center py-3 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium">{formatDate(purchase.date)}</p>
              <p className="text-sm text-muted-foreground">
                {purchase.description}
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium">
                {formatAmount(purchase.amount, purchase.currency)}
              </p>

              {selectedPack === StatusHistoryTrans.REAL && (
                <InvoiceBtn id={purchase.id} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);
}
