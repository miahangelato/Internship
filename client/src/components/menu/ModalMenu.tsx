"use client";

import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Minus, Plus } from "lucide-react";
import { menuItems } from "@/src/data/menu";
import { useCart } from "@/src/store/useCart";
import { useRouter } from "next/navigation";

type MenuItem = (typeof menuItems)[number];

type ModalMenuProps = {
  open: boolean;
  onClose: () => void;
  item: MenuItem | null;
};

export default function ModalMenu({ open, onClose, item }: ModalMenuProps) {
  const { t } = useTranslation("menu");
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  if (!item) return null;

  const stop = (e: MouseEvent) => e.stopPropagation();

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addItem(item, qty);
    onClose();
  };

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        open ? "modal-open" : ""
      }`}
      onClick={onClose}
    >
      <div
        className="modal-box max-w-3xl bg-white text-black relative p-6"
        onClick={stop}
      >
        {/* close button */}
        <button
          className="btn btn-sm btn-circle absolute right-3 top-3"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT — IMAGE */}
          <div className="w-full h-64 md:h-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={item.image}
              alt={t(`${item.id}.name`)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT — DETAILS */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold mb-2">
                {t(`${item.id}.name`)}
              </h2>

              <p className="text-sm opacity-80 mb-4">
                {t(`${item.id}.description`)}
              </p>

              <span className="text-3xl font-bold text-[#3B82F6]">
                ¥{item.price}
              </span>
            </div>

            {/* Quantity Selector + CTA */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="btn btn-outline btn-sm" onClick={decrease}>
                  <Minus size={18} />
                </button>

                <span className="text-xl font-semibold w-6 text-center">
                  {qty}
                </span>

                <button className="btn btn-outline btn-sm" onClick={increase}>
                  <Plus size={18} />
                </button>
              </div>

              <button
                className="btn btn-primary bg-[#3B82F6] text-white flex-1"
                onClick={handleAddToCart}
              >
                {t("cta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
