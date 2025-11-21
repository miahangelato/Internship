"use client";

import React, { useState, useMemo } from "react";
import { menuItems } from "@/src/data/menu";
import { useTranslation } from "react-i18next";
import ModalMenu from "@/src/components/menu/ModalMenu";
import { useCart } from "@/src/store/useCart";

const ITEMS_PER_PAGE = 6;

type MenuItem = (typeof menuItems)[number];

export const MenuItems = () => {
  const { t } = useTranslation("menu");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const cartItems = useCart((s) => s.items);

  const totalPages = Math.max(1, Math.ceil(menuItems.length / ITEMS_PER_PAGE));

  const pagedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return menuItems.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* scrollable grid */}
      <div className="max-h-[600px] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedItems.map((item) => {
            const inCart = cartItems.find((c) => c.id === item.id);
            const quantity = inCart?.quantity ?? 0;

            return (
              <div
                key={item.id}
                className={`card bg-white shadow-xl w-full hover:scale-95 cursor-pointer transition 
                  ${quantity > 0 ? "border-2 border-[#3B82F6]" : "border border-transparent"}`}
                onClick={() => setSelected(item)}
              >
                <figure className="h-48 relative">
                  <img
                    src={item.image}
                    alt={t(`${item.id}.name`)}
                    className="w-full h-full object-cover rounded-t-xl"
                  />

                  {quantity > 0 && (
                    <div className="absolute top-2 right-2 badge badge-  text-white bg-[#3B82F6] gap-1">
                      {t("inCart", "In cart")}: {quantity}
                    </div>
                  )}
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{t(`${item.id}.name`)}</h2>
                  <p className="text-sm opacity-80">
                    {t(`${item.id}.description`)}
                  </p>

                  <div className="card-actions justify-between items-center mt-3">
                    <span className="text-xl font-bold text-[#3B82F6]">
                      ¥{item.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {pagedItems.length === 0 && (
            <p className="col-span-full text-center opacity-60">
              {t("noItems", "No items on this page.")}
            </p>
          )}
        </div>
      </div>

      {/* pagination controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          className="btn btn-sm bg-[#3B82F6]"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          «
        </button>

        <div className="join">
          {Array.from({ length: totalPages }, (_, i) => {
            const p = i + 1;
            const isActive = p === page;
            return (
              <button
                key={p}
                className={`btn btn-sm join-item bg-[#3B82F6] ${
                  isActive ? "btn-primary" : ""
                }`}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          className="btn btn-sm bg-[#3B82F6]"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          »
        </button>
      </div>

      <ModalMenu
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};
