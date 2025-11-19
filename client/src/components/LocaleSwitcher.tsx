"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../store/useSettings";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
] as const;

type Props = {
  inPanel?: boolean;
  onPick?: (code: "en" | "ja") => void;
  className?: string;
};

export default function LocaleSwitcher({ inPanel, onPick, className }: Props) {
  const { i18n } = useTranslation();
  const locale = useSettings((s) => s.locale);
  const setLocale = useSettings((s) => s.setLocale);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
      document.documentElement.lang = locale;
    }
  }, [locale, i18n]);

  useEffect(() => {
    if (!open || inPanel) return;
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open, inPanel]);

  const setLang = async (code: "en" | "ja") => {
    await i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setLocale(code);
    setOpen(false);
    onPick?.(code);
  };

  if (!locale) return null;

  const current =
    LOCALES.find((l) => l.code === locale)?.label ?? locale.toUpperCase();

  if (inPanel) {
    return (
      <div className={className}>
        <button
          className="btn bg-white text-black w-full justify-center"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {current}
          <span className="i-mdi-chevron-down" />
        </button>

        {open && (
          <ul className="menu bg-white text-black shadow w-full" role="listbox">
            {LOCALES.map((l) => {
              const isActive = l.code === locale;
              return (
                <li key={l.code}>
                  <button
                    className={`${
                      isActive
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setLang(l.code)}
                  >
                    {l.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div ref={boxRef} className={`relative ${className ?? ""}`}>
      <button
        className="btn bg-white text-black"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current}
      </button>

      {open && (
        <ul
          className="menu bg-white text-black border rounded-box shadow absolute right-0 mt-2 w-40 z-20"
          role="listbox"
        >
          {LOCALES.map((l) => {
            const isActive = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setLang(l.code)}
                >
                  {l.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
