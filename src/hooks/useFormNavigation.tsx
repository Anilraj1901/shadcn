import { useCallback } from "react";

export const useFormNavigation = () => {
  return useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const target = e.target as HTMLElement;

    const focusable = Array.from(
      form.querySelectorAll<HTMLElement>(
        "input, select, [role='combobox'], [role='file-upload'], textarea, button, [tabindex]:not([tabindex='-1'])"
      )
    );

    const index = focusable.indexOf(target);

    const moveFocus = (nextIndex: number) => {
      if (nextIndex >= 0 && nextIndex < focusable.length) {
        const next = focusable[nextIndex];
        next.focus();

        if (next.getAttribute("role") === "combobox") {
          const event = new CustomEvent("combobox-open", { bubbles: true });
          next.dispatchEvent(event);
        }

        if (next.tagName === "SELECT") {
          try {
            const arrowDown = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "ArrowDown",
            });
            next.dispatchEvent(arrowDown);
          } catch {}
        }

        if (next.getAttribute("role") === "file-upload") {
          // automatically trigger upload dialog when reached
          (next as HTMLInputElement).click();
        }
      }
    };

    const comboParent = target.closest("[role='combobox']");
    const isCheckbox = target.getAttribute("type") === "checkbox";
    const isFileUpload = target.getAttribute("role") === "file-upload";

    if (comboParent) {
      const isOpen =
        comboParent.getAttribute("aria-expanded") === "true" ||
        comboParent.classList.contains("open");
      if (isOpen) return;
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        return;
      }
    }

    if (e.key === "Enter") {
      if (isFileUpload) {
        e.preventDefault();
        (target as HTMLInputElement).click();
        return;
      }
      
      if (
        target.getAttribute("role") === "checkbox" ||
        (target.tagName === "INPUT" &&
          (target as HTMLInputElement).type === "checkbox") || isCheckbox
      ) {
        e.preventDefault();
        (target as HTMLElement).click();
        return;
      }
      if (focusable[index]?.tagName === "BUTTON") return;

      e.preventDefault();
      moveFocus(index + 1);
    }

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      moveFocus(index + 1);
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      moveFocus(index - 1);
    }
  }, []);
};
