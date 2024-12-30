"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeNamesMap1 } from "@/app/constants";
import { useSession } from "next-auth/react";
import SignInButton from "@/app/components/common/SignInButton";
import RegisterButton from "@/app/components/common/RegisterButton";

const Header = () => {
  const pathname = usePathname();
  const { status: authStatus } = useSession();

  const getRouteName = () => {
    return routeNamesMap1.get(pathname.slice(1))?.label;
  };

  return (
    <header className="navbar h-[10%] max-h-16">
      <div className="flex-1">
        {pathname === "/" ? (
          <Link href="/" className="btn btn-ghost text-3xl" role="link">
            Massive Map
          </Link>
        ) : (
          <h1 className="text-3xl font-semibold px-4">{getRouteName()}</h1>
        )}
      </div>
      {authStatus === "loading" ? (
        <span className="loading loading-bars loading-md text-orange-300 mr-16 hidden lg:block"></span>
      ) : (
        <div
          className={`${pathname === "/" ? "space-x-5" : "flex-none"} hidden lg:flex`}
        >
          {pathname === "/" && authStatus === "authenticated" ? (
            <Link
              href="/dashboard"
              className={
                "flex justify-center py-1 btn btn-ghost btn-sm rounded-md active:btn-primary"
              }
              role="link"
            >
              Dashboard
            </Link>
          ) : null}
          {authStatus === "authenticated" && (
            <ConnectButton chainStatus="none" showBalance={false} />
          )}
          {pathname === "/" && authStatus === "unauthenticated" && (
            <>
              <SignInButton />
              <RegisterButton />
            </>
          )}
        </div>
      )}
      <div className="block flex-none lg:hidden">
        <label
          htmlFor="my-drawer"
          aria-label="toggle sidebar"
          className="btn btn-ghost"
        >
          <List color="white" weight="regular" size={32} alt="menu icon" />
        </label>
      </div>
    </header>
  );
};

export default Header;
