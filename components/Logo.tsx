import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center hap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 mr-1">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>
      <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
        Flow
      </span>
      <span className="text-stone-700 dark:text-stone-300">Scrape</span>
    </Link>
  );
}

export default Logo;
