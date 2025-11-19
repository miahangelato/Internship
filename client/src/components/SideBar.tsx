import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

const navSections = [
  {
    title: "メイン",
    items: [
      { label: "ダッシュボード", active: true },
      { label: "設定" },
      { label: "レポート" },
    ],
  },
  {
    title: "管理",
    items: [
      { label: "ユーザー管理" },
      { label: "店舗管理" },
    ],
  },
];

export default function SideBar() {
  const { t } = useTranslation("admin");
  return (
    <aside className="hidden w-64 shrink-0 flex-col rounded-[32px] bg-white shadow-xl lg:flex">
      <div className="flex items-center gap-2 border-b px-6 py-5">
        <div className="text-2xl font-black text-[#3B82F6]">QuickServe</div>
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-500">
          POS
        </span>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-6 py-6 text-sm text-gray-500">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <button
                    className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left transition ${
                      item.active
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <Menu className="h-4 w-4 text-gray-300" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t px-6 py-4 text-xs text-gray-400">
        {t("stats.period")}
      </div>
    </aside>
  );
}
