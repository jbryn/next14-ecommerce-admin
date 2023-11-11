import PageHeading from "@/components/shared/page-heading";
import { CategoryColumn, columns } from "@/components/categories/columns";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ui/api-list";

const CategoriesPage: React.FC<{ params: { storeId: string } }> = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedData: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    label: category.name,
    createdAt: format(category.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col p-8 pt-6">
      <PageHeading title="categories" itemsCount={formattedData.length} />

      <div className="mx-auto py-10">
        <DataTable columns={columns} data={formattedData} searchKey="label" />
      </div>

      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  );
};

export default CategoriesPage;
