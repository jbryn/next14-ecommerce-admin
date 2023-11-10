"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn } from "./columns";

interface BillboardsPageHeadingProps {
  data: BillboardColumn[];
}

const BillboardsPageHeading: React.FC<BillboardsPageHeadingProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex items-center justify-between">
      <Heading
        title={`Billboards (${data.length})`}
        description="Manage billboards for your store"
      />
      <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
        Add new
        <Plus className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default BillboardsPageHeading;
