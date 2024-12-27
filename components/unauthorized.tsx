import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  subTitle: string;
}

const Unauthorized = ({ title, subTitle }: Props) => {
  return (
    <div className="h-screen flex justify-center items-center fixed">
      <div className="text-center pl-10">
        <h1 className="text-3xl md:text-6xl">{title}</h1>
        <p className="mt-2 text-lg">{subTitle}</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-primary px-4 py-2 rounded-md"
        >
          Back to page
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
