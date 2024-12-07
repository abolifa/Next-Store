import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const Heading = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: string;
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Link href={`${action}/new`} className={buttonVariants()}>
        <PlusCircle />
        Add new
      </Link>
    </div>
  );
};

export default Heading;
