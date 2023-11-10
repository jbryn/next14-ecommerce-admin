import BillboardsPageHeading from "@/components/billboards/billboards-page-heading";
import { BillboardColumn, columns } from "@/components/billboards/columns";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";

const BillboardsPage: React.FC<{ params: { storeId: string } }> = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedData: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col p-8 pt-6">
      <BillboardsPageHeading data={formattedData} />

      <div className="mx-auto py-10">
        <DataTable columns={columns} data={formattedData} searchKey="label" />
      </div>

      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
};

export default BillboardsPage;
