// components/layout/ThemeToggle.tsx
// This component provides a toggle switch for changing between light, dark, and system themes
// Located in the header navigation of the application
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ThemeToggle = () => {
  // Destructure theme utilities from next-themes
  const { theme, setTheme } = useTheme();

  // Handle mounting state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Mount component after initial render to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between modes on icon clicks
  const handleSelectTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  // Prevent rendering until component is mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-card border border-border">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleSelectTheme("light")}
              className={`rounded-md p-1.5 transition-colors ${
                theme === "light"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-label="Light mode"
            >
              <Sun className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Light mode</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleSelectTheme("system")}
              className={`rounded-md p-1.5 transition-colors ${
                theme === "system"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-label="System theme"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>System theme</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleSelectTheme("dark")}
              className={`rounded-md p-1.5 transition-colors ${
                theme === "dark"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-label="Dark mode"
            >
              <Moon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dark mode</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
