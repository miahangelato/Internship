"use client";
import React, { useState, useEffect } from "react";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";
import { BellDot, Wifi, Menu, UtensilsCrossed, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import CycleIcon from "@/src/components/CycleIcon";
import { NavbarPage } from "@/src/components/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/src/store/useAuth";

export const HeaderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const panelMaxH = menuOpen ? "max-h-96" : "max-h-0";

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = () => {
    logout();
    router.push("/");
  };

  if (pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <header className="bg-[#3B82F6] text-white md:rounded-none rounded-b-xl">
      {/* top bar */}
      <div className="flex flex-row p-4 justify-between items-center">
        <div className="flex flex-row gap-1 font-bold uppercase text-2xl select-none">
          <UtensilsCrossed className="size-7" />
          {t("brand")}
        </div>

        <div className="hidden md:flex">
          <NavbarPage />
        </div>

        {/* desktop actions */}
        <div className="hidden md:flex flex-row gap-5 font-bold uppercase text-2xl items-center">
          <CycleIcon />
          <BellDot className="size-7 hover:cursor-pointer" />
          <Wifi className="size-7 hover:cursor-pointer" />

          {/* Logout Button */}
          {user ? (
            <button
              className="btn bg-red-500 text-white hover:bg-red-600"
              onClick={handleLogoutClick}
            >
              {t("logout", "Logout")}
            </button>
          ) : (
            <button
              className="btn bg-white text-black hover:bg-blue-800 hover:text-white"
              onClick={handleLoginClick}
            >
              {t("login", "Login")}
            </button>
          )}

          <LocaleSwitcher />
        </div>

        {/* mobile toggle */}
        <div className="md:hidden flex gap-2 justify-between items-center">
          <Wifi className="size-6" />
          <CycleIcon />
          <button
            className="btn btn-circle bg-white text-black swap swap-rotate"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
      </div>

      {/* mobile pull-down panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${panelMaxH}`}
        aria-hidden={!menuOpen}
      >
        <div className="border-t border-white/20 px-4 pb-4 pt-3 flex flex-col gap-4 font-bold uppercase text-xl">
          <div className="md:hidden flex">
            <NavbarPage />
          </div>
          <button className="flex items-center gap-2 text-white/90 hover:text-white">
            <BellDot className="size-6" /> {t("nav.notifications")}
          </button>

          {/* Logout Button */}
          <button
            className="btn bg-white text-black mt-1"
            onClick={() => {
              if (user) {
                handleLogoutClick();
              } else {
                handleLoginClick();
              }
              setMenuOpen(false);
            }}
          >
            {user ? t("logout", "Logout") : t("login", "Login")}
          </button>

          <div className="pt-1">
            <LocaleSwitcher
              inPanel
              onPick={() => setMenuOpen(false)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
