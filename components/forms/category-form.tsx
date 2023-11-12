"use client";

import { Billboard, Category } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "../shared/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "../ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CategoryFormProps {
  initialData: Category | null;
  billboardsData: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Label is required" }),
  billboardId: z.string().min(1, { message: "Billboard is required" }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboardsData,
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData
    ? "Edit category settings"
    : "Add a new category";
  const toastMessage = initialData ? "Category updated" : "Category created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData ? initialData.name : "",
      billboardId: initialData ? initialData.billboardId : "",
      //   imageUrl: initialData ? initialData.imageUrl : "",
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setLoading(true);

      //   if (initialData) {
      //     await axios.patch(
      //       `/api/stores/${params.storeId}/categories/${params.categoryId}`,
      //       values
      //     );
      //   } else {
      //     await axios.post(`/api/stores/${params.storeId}/categories`, values);
      //   }

      toast.success(toastMessage);
      router.refresh();
      //   router.push(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(
      //     `/api/stores/${params.storeId}/categories/${params.categoryId}`
      //   );
      toast.success("Category deleted successfully");
      router.refresh();
      //   router.push(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error("Remove all categories using this billboard");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setModalOpen(true)}
          >
            Delete
            <Trash className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboardsData.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose one of the existing billboards
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.categoryId}`}
        variant="admin"
      />
    </>
  );
};

export default CategoryForm;
