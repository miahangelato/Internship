"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { menuItems } from "@/src/data/menu";
import { MenuItems } from "@/src/components/menu/MenuItems";

export const DashboardPage = () => {
  const { t } = useTranslation("home");
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 1;
  const looped = [...menuItems, ...menuItems]; // simple loop trick
  const visible = looped.slice(startIndex, startIndex + visibleCount);

  useEffect(() => {
    const id = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % menuItems.length);
    }, 2500); // 2.5s per step
    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-2">
      {/* Top */}
      <section className="p-4 flex flex-col md:flex-row">
        {/* Title */}
        <div className="bg-[#EFF6FF] border-[#3B82F6] items-center gap-10 shadow-xl p-8 flex flex-col border-r-2 border-l-2 border-t-2 rounded-t-xl md:rounded-t-none md:border-b-2 md:border-r-transparent md:rounded-l-2xl md:flex-row">
          <div className="flex flex-col flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700">
              {t("title")}
              <span className="text-[#3B82F6]"> {t("paragraph")}</span>
            </h1>

            <p className="mt-4 text-gray-500 md:text-lg">{t("tagline")}</p>
          </div>
        </div>

        {/* Image */}
        <div className="carousel carousel-vertical md:h-full h-96 border-[#3B82F6] border-l-2 border-b-2 border-r-2 rounded-b-xl md:rounded-r-xl md:rounded-l-none md:border-t-2 md:border-l-transparent">
          <div className="carousel-item h-full md:h-70">
            {visible.map((item) => (
              <div key={item.id} className="carousel-item md:w-full">
                <img
                  src={item.image}
                  className="object-cover md:w-250"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="mt-5 flex md:flex-row flex-col gap-3 items-center justify-center">
        <label className="input bg-white border-2 border-black md:min-w-xl">
          <Search />
          <input
            type="search"
            className="grow"
            placeholder={t("search.menu")}
          />
        </label>

        <form className="flex gap-1">
          <label className="btn p-0">
            <input type="checkbox" className="peer hidden" />
            <span className="px-4 py-2 bg-white text-black peer-checked:bg-[#3B82F6] peer-checked:text-white rounded-md">
              {t("by.meals")}
            </span>
          </label>

          <label className="btn p-0">
            <input type="checkbox" className="peer hidden" />
            <span className="px-4 py-2 bg-white text-black peer-checked:bg-[#3B82F6] peer-checked:text-white rounded-md">
              {t("by.price")}
            </span>
          </label>

          <label className="btn p-0">
            <input type="checkbox" className="peer hidden" />
            <span className="px-4 py-2 bg-white text-black peer-checked:bg-[#3B82F6] peer-checked:text-white rounded-md">
              {t("by.desserts")}
            </span>
          </label>

          <input
            className="btn btn-square bg-white text-black"
            type="reset"
            value="×"
          />
        </form>
      </div>

      <div className="p-4">
        <MenuItems />
      </div>
    </div>
  );
};
