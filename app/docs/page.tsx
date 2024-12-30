import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DocsPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-2xl">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-base text-muted-foreground">
          Welcome to our website! Whether you're here to explore, manage your
          account, or access various services, this guide will help you get up
          to speed. Below, you'll find step-by-step instructions for navigating
          through the site and making the most of its features.
        </p>
      </div>
      <div className="pb-12 pt-8">
        <div className="mdx">
          <p className="leading-7">
            This is <strong>NOT</strong> just a browser automation tool. It's a
            platform offering pre-built tasks that simplify web scraping and
            automation. No coding required—just configure, execute, and watch
            your workflows in action.
          </p>
          <p className="leading-7 mt-6">
            <strong>What makes it unique?</strong>
          </p>
          <p className="leading-7 mt-6">
            Automated Tasks: Select from a library of pre-configured tasks or
            create custom workflows tailored to your needs.
          </p>

          <p className="leading-7 mt-6">
            <em>
              Use this as your go-to platform for web automation and
              scraping—hassle-free, efficient, and secure.
            </em>
          </p>
          <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            FAQ
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Why automate with tasks instead of coding everything yourself?
              </AccordionTrigger>
              <AccordionContent>
                Our task library saves you time by providing reusable workflows.
                Customize them to your needs without starting from scratch.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How is my data kept secure?</AccordionTrigger>
              <AccordionContent>
                All credentials (resources) are encrypted, ensuring that
                sensitive information remains protected throughout the process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What can I automate?</AccordionTrigger>
              <AccordionContent>
                From web scraping to data entry, you can automate a wide variety
                of repetitive browser tasks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
