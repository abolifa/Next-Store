"use client";

import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { columns } from "./columns";

const Page = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axios.get("/api/brands");
      return res.data;
    },
  });
  return (
    <div className="space-y-4">
      <Heading
        title="Brands"
        description="Manage your brands"
        action="brands"
      />
      <Separator />

      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default Page;
