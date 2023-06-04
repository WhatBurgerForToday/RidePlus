import React, { type FC } from "react";
import { View } from "react-native";
import { Link, usePathname } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

type Page = {
  href: string;
  icon: FC<{ color: string; backgroundColor: string }>;
};

const PAGES: Page[] = [
  {
    href: "/home",
    icon: ({ color, backgroundColor }) => (
      <Ionicons
        name="md-home"
        size={36}
        backgroundColor={backgroundColor}
        color={color}
      />
    ),
  },
  {
    href: "/message",
    icon: ({ color, backgroundColor }) => (
      <Ionicons
        name="chatbubble-ellipses"
        size={36}
        backgroundColor={backgroundColor}
        color={color}
      />
    ),
  },
  {
    href: "/register-rider",
    icon: ({ color, backgroundColor }) => (
      <AntDesign
        name="clockcircle"
        size={36}
        backgroundColor={backgroundColor}
        color={color}
      />
    ),
  },
  {
    href: "/rider-profile",
    icon: ({ color, backgroundColor }) => (
      <FontAwesome
        name="user"
        size={36}
        backgroundColor={backgroundColor}
        color={color}
      />
    ),
  },
];

export const Nav = () => {
  const pathname = usePathname();

  const getNavClasses = (href: string) => {
    if (href === pathname) {
      return "bg-white rounded-b-full pt-3 pb-2 px-3";
    }
    return "pt-3 pb-1 px-3";
  };

  const getIconColor = (href: string) => {
    if (href === pathname) {
      return {
        color: "#FBBF24",
        backgroundColor: "#FFFFFF",
      };
    }
    return {
      color: "#FFFFFF",
      backgroundColor: "",
    };
  };

  return (
    <View className="flex-row justify-around rounded-t-xl bg-amber-400 pb-2">
      {PAGES.map((page) => (
        <View key={page.href} className={getNavClasses(page.href)}>
          <Link href={page.href}>
            <page.icon {...getIconColor(page.href)} />
          </Link>
        </View>
      ))}
    </View>
  );
};
