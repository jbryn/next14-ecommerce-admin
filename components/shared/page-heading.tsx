"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface PageHeadingProps {
  title: "billboards" | "categories";
  itemsCount: Number;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, itemsCount }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex items-center justify-between">
      <Heading
        title={`${title} (${itemsCount})`}
        description={`Manage ${title} for your store`}
      />
      <Button onClick={() => router.push(`/${params.storeId}/${title}/new`)}>
        Add new
        <Plus className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default PageHeading;
