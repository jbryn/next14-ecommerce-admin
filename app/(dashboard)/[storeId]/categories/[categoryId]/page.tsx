import CategoryForm from "@/components/forms/category-form";
import prismadb from "@/lib/prismadb";

const CategoryPage: React.FC<{
  params: { storeId: string; categoryId: string };
}> = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm initialData={category} billboardsData={billboards} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
