import { type FC, type PropsWithChildren } from "react";
import { View } from "react-native";
import { Link, usePathname } from "expo-router";

export type Page = {
  href: string;
  icon: FC<{ color: string; backgroundColor: string }>;
};

export const Navbar = ({ children }: PropsWithChildren) => {
  return (
    <View className="flex-row justify-around rounded-t-xl bg-amber-400 pb-2">
      {children}
    </View>
  );
};

type NavbarLinkProps = {
  href: string;
  children: FC<{ active: boolean }>;
};

Navbar.Link = ({ href, children: Component }: NavbarLinkProps) => {
  const pathname = usePathname();

  const getNavClasses = (href: string) => {
    if (href === pathname) {
      return "bg-white rounded-b-full pt-3 pb-2 px-3";
    }
    return "pt-3 pb-1 px-3";
  };

  return (
    <View className={getNavClasses(href)}>
      <Link href={href}>
        <Component active={href === pathname} />
      </Link>
    </View>
  );
};
