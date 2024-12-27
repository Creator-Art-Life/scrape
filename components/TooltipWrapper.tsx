"use client";

import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface TooltipWrapperProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  href?: string;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  content,
  side = "top",
  href,
}) => {
  if (!content) return <>{children}</>;

  const TooltipContentWrapper = (
    <TooltipContent side={side}>{content}</TooltipContent>
  );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {href ? (
          <Link href={href}>{TooltipContentWrapper}</Link>
        ) : (
          TooltipContentWrapper
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
