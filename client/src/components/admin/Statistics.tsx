"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  Globe,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  UserCircle2,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

type ChartPoint = { label: string; value: number };
type ProductRow = {
  name: string;
  category: string;
  sold: number;
  revenue: string;
  growth: string;
  status: string;
};

const ordersByHour: ChartPoint[] = [
  { label: "10:00", value: 25 },
  { label: "11:00", value: 40 },
  { label: "12:00", value: 80 },
  { label: "13:00", value: 65 },
  { label: "14:00", value: 50 },
  { label: "15:00", value: 35 },
];

const revenueTrend: ChartPoint[] = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 55 },
  { label: "Wed", value: 60 },
  { label: "Thu", value: 48 },
  { label: "Fri", value: 82 },
  { label: "Sat", value: 95 },
  { label: "Sun", value: 70 },
];

const channelBreakdown = [
  { labelKey: "stats.qr", value: "68%" },
  { labelKey: "stats.staffEntry", value: "22%" },
  { labelKey: "stats.takeout", value: "10%" },
];

const alertList = [
  { labelKey: "stats.slow", tone: "warning" },
  { labelKey: "stats.payRetry", tone: "info" },
  { labelKey: "stats.noAlert", tone: "success" },
];

export default function StatisticsPage() {
  const { t } = useTranslation("admin");
  const router = useRouter();

  const productRows: ProductRow[] = [1, 2, 3, 4].map(
    (index) =>
      t(`stats.rows.${index}`, {
        returnObjects: true,
      }) as ProductRow
  );

  const navSections = [
    {
      title: "Main",
      items: [
        { label: t("stats.title"), active: true },
        { label: "Applications" },
      ],
    },
    {
      title: "Operations",
      items: [
        { label: t("stats.section.salesDashboard") },
        { label: t("stats.section.menuAnalysis") },
        { label: t("stats.section.revenueTrend") },
      ],
    },
    {
      title: "Reports",
      items: [
        { label: t("stats.section.systemStatus") ?? t("stats.section.systemHealth") },
        { label: t("stats.actions.viewLogs") },
        { label: t("stats.actions.alertSettings") },
      ],
    },
  ];

  const summaryCards = [
    {
      label: t("stats.salesTotal"),
      value: "A¥127,850",
      delta: `+6.0% ${t("stats.vsYesterday")}`,
      icon: <ShoppingBag className="h-5 w-5 text-indigo-500" />,
    },
    {
      label: t("stats.salesCount"),
      value: "342",
      delta: `+3.2% ${t("stats.vsYesterday")}`,
      icon: <BarChart3 className="h-5 w-5 text-emerald-500" />,
    },
    {
      label: t("stats.avgCheck"),
      value: "A¥374",
      delta: t("stats.perCustomer"),
      icon: <Users className="h-5 w-5 text-amber-500" />,
    },
    {
      label: t("stats.turnover"),
      value: "2.8",
      delta: t("stats.turnoverNote"),
      icon: <Clock className="h-5 w-5 text-sky-500" />,
    },
  ];

  const focusCards = [
    {
      value: "100",
      label: t("stats.totalOrders"),
      desc: t("stats.ordersDesc"),
      color: "bg-orange-400",
    },
    {
      value: "A¥127,850",
      label: t("stats.revenue"),
      desc: t("stats.revenueDesc"),
      color: "bg-cyan-500",
    },
    {
      value: "A¥374",
      label: t("stats.avgOrderValue"),
      desc: t("stats.avgOrderDesc"),
      color: "bg-indigo-900",
    },
    {
      value: "26",
      label: t("stats.activeTables"),
      desc: t("stats.activeTablesDesc"),
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-8">
        {/* Main content */}
        <main className="flex-1 space-y-6">
          {/* top toolbar */}
          <header className="rounded-[32px] bg-white px-6 py-5 shadow flex items-center justify-between">
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
                className="rounded-2xl bg-[#3B82F6] px-6 py-2 text-base font-semibold text-white shadow hover:bg-[#0851c7]"
                onClick={() => router.push("/admin/create")}
              >
                {t("stats.createMenu")}
              </button>
            </div>
            <div className="flex items-center gap-6 text-gray-400 ml-6">
              <Globe className="h-5 w-5" />
              <Bell className="h-5 w-5" />
              <Settings className="h-5 w-5" />
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 bg-white">
                <UserCircle2 className="h-9 w-9 text-[#3B82F6]" />
                <div>
                  <p className="text-base font-semibold text-gray-800">John Smilga</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
              </div>
            </div>
          </header>

          {/* summary cards */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{card.label}</span>
                  {card.icon}
                </div>
                <p className="mt-3 text-3xl font-semibold text-gray-900">{card.value}</p>
                <p className="text-xs text-emerald-600">{card.delta}</p>
              </div>
            ))}
          </section>

          {/* focus cards row */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {focusCards.map((card) => (
              <div
                key={card.label}
                className={`${card.color} rounded-3xl px-6 py-5 text-white shadow-lg`}
              >
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm font-semibold">{card.label}</p>
                <p className="text-xs opacity-80">{card.desc}</p>
              </div>
            ))}
          </section>

          {/* chart + table */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {t("stats.section.salesDashboard")}
                  </p>
                  <p className="text-sm text-gray-600">{t("stats.section.dailyView")}</p>
                </div>
                <button className="text-xs font-semibold text-[#3B82F6]">
                  {t("stats.viewMore")}
                </button>
              </div>
              <div className="mt-6 flex h-48 items-end gap-3">
                {ordersByHour.map((point) => (
                  <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end rounded-full bg-slate-100">
                      <div
                        className="w-full rounded-full bg-gradient-to-t from-[#3B82F6] to-emerald-400"
                        style={{ height: `${point.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{point.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400">{t("stats.chartLegend")}</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {t("stats.section.menuAnalysis")}
                  </p>
                  <p className="text-sm text-gray-600">{t("stats.section.byQuantity")}</p>
                </div>
                <div className="text-xs text-gray-400">{t("stats.filter.hotItems")}</div>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="grid grid-cols-5 text-xs uppercase tracking-wide text-gray-400">
                  <span>{t("stats.col.product")}</span>
                  <span>{t("stats.col.category")}</span>
                  <span className="text-right">{t("stats.col.qty")}</span>
                  <span className="text-right">{t("stats.col.sales")}</span>
                  <span className="text-right">{t("stats.col.status")}</span>
                </div>
                {productRows.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-5 items-center rounded-2xl bg-slate-50 px-3 py-2 text-xs text-gray-600"
                  >
                    <span className="font-semibold text-gray-800">{row.name}</span>
                    <span>{row.category}</span>
                    <span className="text-right font-semibold">{row.sold}</span>
                    <span className="text-right">{row.revenue}</span>
                    <span className="text-right text-[#3B82F6]">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* trend + channels + system */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {t("stats.section.revenueTrend")}
                  </p>
                  <p className="text-sm text-gray-600">{t("stats.section.weeklyView")}</p>
                </div>
                <Activity className="h-5 w-5 text-[#3B82F6]" />
              </div>
              <div className="mt-6 flex h-36 items-end justify-between gap-2">
                {revenueTrend.map((point) => (
                  <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-full w-full items-end">
                      <div
                        className="h-full w-full rounded-2xl bg-gradient-to-t from-emerald-100 to-[#3B82F6]/70"
                        style={{ height: `${point.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{point.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400">{t("stats.trendLabel")}</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                {t("stats.channelBreakdown")}
              </p>
              <div className="mt-4 space-y-4 text-sm">
                {channelBreakdown.map((channel) => (
                  <div key={channel.labelKey} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{t(channel.labelKey)}</span>
                    </div>
                    <span className="font-semibold">{channel.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs uppercase tracking-wide text-gray-400">
                {t("stats.alerts")}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {alertList.map((alert) => (
                  <li
                    key={alert.labelKey}
                    className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2"
                  >
                    {alert.tone === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    ) : alert.tone === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Bell className="h-4 w-4 text-[#3B82F6]" />
                    )}
                    <span className="text-gray-600">{t(alert.labelKey)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {t("stats.system.overall")}
                  </p>
                  <p className="text-2xl font-semibold text-emerald-500">
                    {t("stats.system.normal")}
                  </p>
                  <p className="text-xs text-gray-500">{t("stats.system.normalDesc")}</p>
                </div>
                <div className="rounded-full bg-emerald-50 p-3">
                  <Activity className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400">{t("stats.system.activeSessions")}</p>
                  <p className="text-lg font-semibold">128</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t("stats.system.requests")}</p>
                  <p className="text-lg font-semibold">4.3k</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t("stats.system.errorRate")}</p>
                  <p className="text-lg font-semibold text-emerald-600">0.2%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t("stats.system.slaBreaches")}</p>
                  <p className="text-lg font-semibold">0</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>{t("stats.sla.uptime")}</span>
                  <span className="font-semibold">99.92%</span>
                </div>
                <p className="text-xs text-gray-400">{t("stats.sla.target")}</p>
              </div>
              <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>{t("stats.sla.latency")}</span>
                  <span className="font-semibold">82 ms</span>
                </div>
                <p className="text-xs text-gray-400">{t("stats.sla.latencyTarget")}</p>
              </div>
              <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>{t("stats.sla.api")}</span>
                  <span className="font-semibold">99.7%</span>
                </div>
                <p className="text-xs text-gray-400">{t("stats.sla.apiTarget")}</p>
              </div>
              <div className="mt-4 flex gap-2 text-xs font-semibold text-[#3B82F6]">
                <button>{t("stats.actions.viewLogs")}</button>
                <button>{t("stats.actions.maintenance")}</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
