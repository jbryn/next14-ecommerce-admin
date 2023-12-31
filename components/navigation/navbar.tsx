import { UserButton, auth } from "@clerk/nextjs";

import NavigationItems from "@/components/navigation/navigation-items";
import StoreSwitcher from "@/components/navigation/store-switcher";

import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <NavigationItems className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
