"use client";

import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/login/loginHooks";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";
import { useAuth } from "@/src/store/useAuth";

const ROLE_ROUTES: Record<string, string> = {
  admin: "/admin",
  manager: "/admin",
  hall: "/dashboard",
  kitchen: "/cart",
};

const resolveRouteForRole = (role?: string) => {
  if (!role) return "/login/role-selection";
  const normalized = role.toLowerCase();
  return ROLE_ROUTES[normalized] ?? "/login/role-selection";
};

export default function LoginPage() {
  const { t } = useTranslation("login");
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result?.data?.user) {
      setUser(result.data.user);
      // Always redirect to role selection after login
      router.push("/login/role-selection");
      return;
    }
    if (result && result.success) {
      router.push("/login/role-selection");
    }
    // error is handled by the hook
  };

  return (

    <div className="relative flex min-h-screen items-center justify-center bg-[#00C18C] px-4 py-10">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#00D19B] via-[#00BB81] to-[#00925E]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-[36px] bg-white width-320px height-500px top-280px left-240px px-8 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] md:px-12 md:py-14">
        <div className="mb-8 flex flex-col items-center text-center">
          <span role="img" aria-label="plate with cutlery" className="text-6xl">
            <LocaleSwitcher />
            🍽️
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              {t("usernameLabel")}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00C18C]"
              placeholder={t("usernamePlaceholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              {t("passwordLabel")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00C18C]"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#00C18C] focus:ring-[#00C18C]"
            />
            <label htmlFor="remember" className="text-xs md:text-sm text-gray-600">
              {t("rememberMe")}
            </label>
          </div>
          {error && (
            <p className="text-sm text-red-500">{t("invalidCredentials")}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#00C18C] py-3 text-lg font-semibold text-white transition hover:bg-[#00A877] disabled:opacity-70"
            disabled={loading}
          >
            {loading ? t("loading") : t("loginButton")}
          </button>
        </form>
        <p className="mt-8 text-center text-xs text-gray-400">
          {t("helpText")}
        </p>
      </div>
    </div>
  );
}
