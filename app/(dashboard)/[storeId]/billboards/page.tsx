"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BillboardsPage = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          Add new
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BillboardsPage;
