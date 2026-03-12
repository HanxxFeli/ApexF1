"use client";

import * as React from "react";

export function useThemeColors() {
  const [colors, setColors] = React.useState({
    text: "#ffffff",
    surface: "#000000",
  });

  React.useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const styles = getComputedStyle(root);

      setColors({
        text: styles.getPropertyValue("--foreground").trim(),
        surface: styles.getPropertyValue("--surface").trim(),
      });
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return colors;
}