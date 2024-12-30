"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import { ModeToggle } from "@/components/ThemeModeToggle";
import Sign from "@/components/Sign";
import DesktopSidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 h-[50px]">
        <BreadcrumbHeader />
        <div className="gap-1 flex items-center">
          <ModeToggle />
          <Sign />
        </div>
      </header>
      <Separator />

      {/* Main layout with Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <DesktopSidebar />

        {/* Main Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
