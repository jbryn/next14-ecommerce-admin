import ApiAlert from "@/components/api-alert";
import SettingsForm from "@/components/forms/settings-form";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params,
}: SettingsPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
        <Separator />
        <ApiAlert title="test" description="test" variant="admin" />
      </div>
    </div>
  );
};

export default SettingsPage;
