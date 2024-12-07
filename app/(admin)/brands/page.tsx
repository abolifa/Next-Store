import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-4">
      <Heading
        title="Brands"
        description="Manage your brands"
        action="brands"
      />
      <Separator />
    </div>
  );
};

export default Page;
