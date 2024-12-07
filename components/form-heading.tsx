import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "@/app/(admin)/layout";

const FormHeading = ({
  title,
  description,
  action,
  id,
}: {
  title: string;
  description: string;
  action: string;
  id: string | null;
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: [action],
    mutationFn: async () => {
      await axios.delete(`/api/${action}/${id}`);
    },
    onMutate: () => {
      toast.loading("Deleting...", { id: id! });
    },
    onSuccess: () => {
      toast.success("Deleted successfully", { id: id! });
    },
    onError: (error) => {
      toast.error(error.message, { id: id! });
    },
    onSettled: async () => {
      await queryClient
        .invalidateQueries({ queryKey: [action] })
        .then(() => router.push(`/${action}`));
    },
  });
  return (
    <div className="w-full flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {id !== null && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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
      )}
    </div>
  );
};

export default FormHeading;
