import BillboardsPageHeading from "@/components/billboards/billboards-page-heading";
import prismadb from "@/lib/prismadb";

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

  return (
    <div className="flex-col">
      <BillboardsPageHeading data={billboards} />
    </div>
  );
};

export default BillboardsPage;
