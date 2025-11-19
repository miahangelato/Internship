"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/store/useAuth";
import { useTranslation } from "react-i18next";

type RoleCard = {
  key: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
};

const ROLES: RoleCard[] = [
  { key: "manager", icon: "🧑‍💼", titleKey: "manager", descriptionKey: "managerDesc" },
  { key: "hall", icon: "🍽️", titleKey: "hall", descriptionKey: "hallDesc" },
  { key: "kitchen", icon: "👨‍🍳", titleKey: "kitchen", descriptionKey: "kitchenDesc" },
];

const splitDescription = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export default function RoleSelectionPage() {
  const router = useRouter();
  const { t } = useTranslation("roleSelection");
  const user = useAuth((s) => s.user);
  const [highlighted, setHighlighted] = useState<string>("hall");

  const handleSelect = (role: string) => {
    router.push(`/${role}`);
  };

  const displayName = user?.fullName || user?.username || "";

  return (
    <div className="min-h-screen bg-[#EEF5FF] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-[36px] bg-white px-8 py-12 md:px-16 shadow-[0_35px_75px_rgba(15,23,42,0.12)]">
        <div className="mb-12 text-center space-y-1">
          <p className="text-base font-semibold text-gray-900 tracking-tight">
            {t("welcome", { name: displayName })}
          </p>
          <p className="text-sm text-gray-500">{t("selectRole")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ROLES.map((role) => {
            const isActive = highlighted === role.key;
            const descriptionLines = splitDescription(t(role.descriptionKey));

            return (
              <button
                key={role.key}
                type="button"
                className={`flex min-h-[230px] flex-col items-center justify-between rounded-[28px] border-2 px-8 py-8 text-center transition-all focus:outline-none ${
                  isActive
                    ? "border-[#3B82F6] shadow-[0_20px_45px_rgba(59,130,246,0.25)]"
                    : "border-gray-200 shadow-sm hover:border-[#3B82F6]/70"
                }`}
                onMouseEnter={() => setHighlighted(role.key)}
                onFocus={() => setHighlighted(role.key)}
                onClick={() => handleSelect(role.key)}
                aria-label={t(role.titleKey)}
              >
                <span className="text-6xl" aria-hidden="true">
                  {role.icon}
                </span>
                <div className="mt-4 space-y-1">
                  <p className={`text-base font-semibold ${isActive ? "text-[#1D2B50]" : "text-gray-900"}`}>
                    {t(role.titleKey)}
                  </p>
                  <div className="text-xs leading-relaxed text-gray-500">
                    {descriptionLines.length > 0
                      ? descriptionLines.map((line, index) => (
                          <div key={`${role.key}-${index}`}>{line}</div>
                        ))
                      : t(role.descriptionKey)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
            onClick={() => router.push("/login")}
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
