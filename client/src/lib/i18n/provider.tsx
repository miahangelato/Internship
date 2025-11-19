"use client";

import { useEffect, useState } from "react";
import { I18nextProvider as Provider } from "react-i18next";
import { initI18nClient, i18nInstance } from "../i18n/config";

function getPersistedLocale(): "en" | "ja" {
  try {
    const raw = localStorage.getItem("app-settings");
    if (!raw) return "en";
    const parsed = JSON.parse(raw);
    return (parsed?.state?.locale as "en" | "ja") || "en";
  } catch {
    return "en";
  }
}

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = getPersistedLocale();
    initI18nClient(initial).then(() => {
      document.documentElement.lang = initial;
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return <Provider i18n={i18nInstance}>{children}</Provider>;
}
