import { useState, useEffect, useContext, createContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const storedTheme = process.browser && localStorage.getItem("theme");

  const [theme, setTheme] = useState(storedTheme);
  const cachedTheme = theme === "dark" ? "light" : "dark";

  function toggleTheme() {
    setTheme(cachedTheme);
  }

  function preferredTheme() {
    const root = window.document.documentElement;

    root.classList.remove(cachedTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    preferredTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  return useContext(ThemeContext);
}
