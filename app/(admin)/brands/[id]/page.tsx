"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormHeading from "@/components/form-heading";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  mediaId: z.string().nullable(),
});

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<Prisma.BrandGetPayload<{
    include: { media: true };
  }> | null>(null);
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      mediaId: null,
    },
  });

  useEffect(() => {
    const fetchRecord = async () => {
      if (id === "new") return;
      else {
        const request = await axios.get(`/api/brands/${id}`);
        setRecord(request.data);
        form.reset(request.data);
      }
    };
    setLoading(false);
    fetchRecord();
  }, [id, form.reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (record) {
        await axios.put(`/api/brands/${id}`, values);
        router.push("/brands");
        toast.success("Record updated successfully");
      } else {
        await axios.post("/api/brands", values);
        router.push("/brands");
        toast.success("Record created successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="space-y-4">
      <FormHeading
        title="Create Brand"
        description="Manage brand information"
        action="brands"
        id={record ? record.id : null}
      />
      <Separator />
      <div className="p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
