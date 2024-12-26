"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

interface Props {
  children: ReactNode;
  text: string;
  link: string;
  icon: ReactNode;
}

const MobileWarning: React.FC<Props> = ({ children, text, link, icon }) => {
  const isMobile = useIsMobile();
  {
    if (isMobile) {
      return (
        <div className="fixed inset-0 m-auto z-10 flex items-center justify-center backdrop-blur-md bg-background/50 pointer-events-none">
          <Card className="pointer-events-auto">
            <CardHeader>
              <CardTitle>Warning</CardTitle>
              <CardDescription>
                This content is only available on PC.
              </CardDescription>
              <Link
                href={link}
                className="p-2 w-fit bg-secondary rounded-md flex items-center gap-2"
              >
                {icon}
                {text}
              </Link>
            </CardHeader>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default MobileWarning;
