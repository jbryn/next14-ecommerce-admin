import BillboardsPageHeading from "@/components/billboards/billboards-page-heading";
import { BillboardColumn, columns } from "@/components/billboards/columns";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { DataTable } from "@/components/ui/data-table";

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
    </div>
  );
};

export default BillboardsPage;
