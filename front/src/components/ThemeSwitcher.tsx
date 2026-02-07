import React from "react";
import { Switch } from "./ui/Switch";
import { getStoredTheme, setTheme, type Theme } from "../utils/theme";

function nextTheme(checked: boolean): Theme {
  return checked ? "dark" : "light";
}

export function ThemeSwitcher() {
  const [theme, setThemeState] = React.useState<Theme>(() => getStoredTheme() ?? "light");

  React.useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-700 dark:text-slate-300">Светлая</span>
      <Switch
        aria-label="Переключить тему"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setThemeState(nextTheme(checked))}
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">
        Темная
      </span>
    </div>
  );
}


