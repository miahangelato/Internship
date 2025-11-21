"use client";
import { useState } from "react";
import { useCart } from "@/src/store/useCart";
import { useTranslation } from "react-i18next";
import { menuItems } from "@/src/data/menu";
import { Trash2 } from "lucide-react";
import ModalMenu from "@/src/components/menu/ModalMenu";

type MenuItem = (typeof menuItems)[number];
const TAX_RATE = 0.1;
const SERVICE_RATE = 0.05;

export default function CartPage() {
  const { t } = useTranslation("menu");
  const { items, updateQuantity, removeItem, clear } = useCart();
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const withMeta = items.map((cartItem) => {
    const meta = menuItems.find((m) => m.id === cartItem.id);
    return { ...cartItem, meta };
  });

  const total = withMeta.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subtotal = withMeta.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const serviceCharge = subtotal * SERVICE_RATE;
  const grandTotal = subtotal + tax + serviceCharge;

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-3xl text-[#3B82F6] text-center underline font-extrabold mb-2">
        {t("cartTitle")}
      </h1>
      <div className="text-lg text-gray-500 text-center mb-4">
        {t("titlePara")}
      </div>

      {withMeta.length === 0 ? (
        <p className="opacity-70">{t("cartEmpty")}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-3 md:items-start">
          {/* LEFT: items list */}
          <div className="flex-1 space-y-3 max-h-[300px] md:max-h-[580px] cursor-pointer overflow-y-auto pr-1">
            {withMeta.map((item) =>
              item.meta ? (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border rounded-xl p-3 bg-white shadow-sm"
                  onClick={() => setSelected(item)}
                >
                  <img
                    src={item.meta.image}
                    alt={t(`${item.id}.name`)}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">{t(`${item.id}.name`)}</h2>
                    <p className="text-xs opacity-70 mb-1">
                      {t(`${item.id}.description`)}
                    </p>
                    <span className="font-bold opacity-80 text-[#3B82F6]">
                      ¥{item.price}
                    </span>
                  </div>

                  {/* quantity + remove */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-outline btn-xs"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        className="btn btn-outline btn-xs"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-ghost btn-sm text-sm text-red-500 hover:bg-[#EF4444] hover:text-white flex items-center gap-1"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      {t("remove")}
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* RIGHT: summary card */}
          <aside className="w-full md:w-150 mt-4 md:mt-0">
            <div className="fieldset mb-2">
              <h1 className="font-bold text-md">{t("notes")}</h1>
              <textarea
                className="textarea h-24 w-full bg-white border border-black"
                placeholder={t("placeholder")}
              ></textarea>
            </div>

            <div className="border-t pt-4 md:p-4 flex flex-col gap-3">
              <div className="flex justify-between">
                <h1>{t("totalItems")}</h1>
                <p className="text-sm opacity-70">
                  {t("items", {
                    count: withMeta.length,
                  })}
                </p>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>¥{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("tax")}</span>
                  <span>¥{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("serviceCharge")}</span>
                  <span>¥{serviceCharge.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t mt-2">
                <h1 className="font-extrabold text-2xl">{t("total")}</h1>
                <p className="text-2xl text-[#3B82F6] font-bold">
                  ¥{grandTotal.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button
                  className="btn btn-outline btn-sm hover:bg-[#EF4444] hover:text-white"
                  onClick={clear}
                >
                  {t("clearCart")}
                </button>
                <button className="btn btn-primary bg-[#3B82F6] hover:bg-[#0851c7] btn-sm">
                  {t("checkout")}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      <ModalMenu
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
