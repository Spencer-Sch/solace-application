"use client";
import { routeNamesArr1 } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconContext } from "@phosphor-icons/react";
import { useFunctionStore } from "@/app/stores/functionStore";
import { RefObject } from "react";

interface Props {
  drawerRef: RefObject<HTMLInputElement>;
}

export default function SidedrawerNav({ drawerRef }: Props) {
  const pathname = usePathname();
  const isActiveRoute = (route: string) => {
    return pathname === route;
  };
  const closeDrawerOnNav = useFunctionStore((state) => state.closeDrawerOnNav);

  function handleClick() {
    closeDrawerOnNav(drawerRef);
  }

  return (
    <IconContext.Provider
      value={{
        size: 30,
        className: "mx-5",
      }}
    >
      <nav className="flex flex-col flex-1 h-full w-full py-10">
        <ul className="flex flex-col space-y-8">
          {routeNamesArr1.map((route) => (
            <li key={route.label}>
              <Link
                href={route.path}
                className={`${isActiveRoute(route.path) ? "btn-primary hover:bg-primary" : ""} flex justify-start btn rounded-md py-1.5 w-full h-full focus:btn-primary active:btn-active`}
                role="link"
                onClick={handleClick}
              >
                {<route.icon />}
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
