import React from "react";
import { House, ShoppingBasket, Users, Search, Globe, Bell, Settings, UserCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NavbarPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <header className="rounded-[32px] bg-white px-6 py-5 shadow bg-red">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("stats.title")}
              className="w-full bg-transparent text-sm text-gray-600 outline-none"
            />
          </div>
          <button
            className="hidden rounded-2xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0851c7] md:inline-flex"
            onClick={() => router.push("/admin/create")}
          >
            {t("stats.createMenu")}
          </button>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Globe className="h-5 w-5" />
          <Bell className="h-5 w-5" />
          <Settings className="h-5 w-5" />
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2">
            <UserCircle2 className="h-9 w-9 text-[#3B82F6]" />
            <div>
              <p className="text-sm font-semibold text-gray-800">John Smilga</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
