import { UserButton } from "@clerk/nextjs";
import NavigationItems from "./navigation-items";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>Store switcher</div>
        <NavigationItems className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
