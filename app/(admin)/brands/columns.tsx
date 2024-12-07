"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../layout";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <Badge>{row.original.id}</Badge>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "slug",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) =>
      format(new Date(row.original.created), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) =>
      format(new Date(row.original.updated), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const mutation = useMutation({
        mutationKey: ["brands"],
        mutationFn: async () => {
          await axios.delete(`/api/brands/${row.original.id}`);
        },
        onMutate: () => {
          toast.loading("Deleting...", { id: row.original.id });
        },
        onSuccess: () => {
          toast.success("Deleted successfully", { id: row.original.id });
        },
        onError: (error) => {
          toast.error(error.message, { id: row.original.id });
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
      });

      return (
        <div className="flex items-center justify-end mr-3 gap-1.5">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => router.push(`/brands/${row.original.id}`)}
          >
            <Edit />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size={"sm"}>
                <Trash2 />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutation.mutate()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
