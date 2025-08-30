import { useCallback, useEffect, useRef } from "react"

const isVisible = (el: HTMLElement) =>
  !!(el.offsetParent || el.getClientRects().length)

/** Collect focusable controls for a form, including external controls linked via form="id" */
function getFocusable(form: HTMLFormElement): HTMLElement[] {
  const inside = Array.from(
    form.querySelectorAll<HTMLElement>(
      "input, select, textarea, button, [role='combobox'], [role='file-upload'], [tabindex]:not([tabindex='-1'])"
    )
  )

  // Include elements outside the form linked with the form attribute (e.g., submit in DialogFooter)
  const external =
    form.id
      ? Array.from(
        document.querySelectorAll<HTMLElement>(
          `[form='${form.id}']`
        )
      )
      : []

  // Merge, filter disabled/hidden/inert, de-dup
  const seen = new Set<HTMLElement>()
  const all = [...inside, ...external].filter((el) => {
    if (seen.has(el)) return false
    seen.add(el)
    const disabled =
      el.hasAttribute("disabled") ||
      (el as HTMLButtonElement).disabled ||
      (el as HTMLInputElement).disabled
    const ariaHidden = el.getAttribute("aria-hidden") === "true"
    return !disabled && !ariaHidden && isVisible(el)
  })

  return all
}

/** Resolve the index of the element that should define the position in the focus order */
function resolveIndex(list: HTMLElement[], node: HTMLElement): number {
  // Exact match first
  let i = list.indexOf(node)
  if (i !== -1) return i

  // Walk up ancestors to find the element that is in the list
  let el: HTMLElement | null = node
  while (el && el !== document.body) {
    i = list.indexOf(el)
    if (i !== -1) return i
    el = el.parentElement
  }

  // As a fallback, try the focus container used by shadcn/radix
  const container = node.closest<HTMLElement>("[role='combobox'], select")
  if (container) {
    i = list.indexOf(container)
    if (i !== -1) return i
  }

  return -1
}

export const useFormNavigation = () => {
  // Track the last combobox/select trigger we interacted with (helps across portals)
  const lastComboRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    const target = e.target as HTMLElement
    const focusable = getFocusable(form)

    const tag = (target.tagName || "").toLowerCase()
    const type = (target as HTMLInputElement).type || ""
    const isTextarea = tag === "textarea"
    const isRadio = tag === "input" && type === "radio"

    const comboOrSelect = target.closest<HTMLElement>("[role='combobox'], select")
    const isComboOrSelect = !!comboOrSelect
    const isExpanded = comboOrSelect?.getAttribute("aria-expanded") === "true"

    const index = resolveIndex(focusable, comboOrSelect ?? target)
    if (index === -1) return // if we can’t resolve, don’t move focus at all

    // Remember last combobox/select trigger we touched (for later use on selection)
    if (comboOrSelect) lastComboRef.current = comboOrSelect

    // ENTER / NUMPAD ENTER
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      // If a closed select/combobox → open it
      if (isComboOrSelect && !isExpanded) {
        e.preventDefault()
          ; (comboOrSelect as HTMLElement).click()
        return
      }

      // Textarea: allow newline
      if (isTextarea) return

      // Submit/reset buttons: allow default (do not move focus)
      if (tag === "button") {
        const btnType = (target as HTMLButtonElement).type || "submit"
        if (btnType === "submit" || btnType === "reset") return
      }

      // Normal: move to next if it exists (no wrap)
      e.preventDefault()
      const next = focusable[index + 1]
      if (next) next.focus()
      return
    }

    // Prevent ArrowUp/Down/Space from opening a closed combobox (only Enter should open)
    if (isComboOrSelect && !isExpanded) {
      if (["ArrowDown", "ArrowUp", "Spacebar", " "].includes(e.key)) {
        e.preventDefault()
        // Optional: Arrow navigation across fields (no wrap)
        console.log("Arrow navigation:", e.key)
        if (["ArrowDown"].includes(e.key)) focusable[index + 1]?.focus()
        if (["ArrowUp"].includes(e.key)) focusable[index - 1]?.focus()
        return
      }
    }

    // Don’t hijack arrows for radios (let the browser change selection)
    if (isRadio) return

    // Arrow navigation between fields when not on a combobox
    if (!isComboOrSelect) {
      if (["ArrowDown"].includes(e.key)) {
        e.preventDefault()
        focusable[index + 1]?.focus()
        return
      }
      if (["ArrowUp"].includes(e.key)) {
        e.preventDefault()
        if (index - 1 >= 0) focusable[index - 1]?.focus()
        return
      }
    }
  }, [])

  useEffect(() => {
    // Track which combobox was interacted with (works even if opened by mouse)
    const rememberCombo = (ev: Event) => {
      const t = ev.target as HTMLElement
      const combo = t?.closest<HTMLElement>("[role='combobox'], select")
      if (combo) lastComboRef.current = combo
    }
    document.addEventListener("pointerdown", rememberCombo, true)
    document.addEventListener("keydown", rememberCombo, true)

    // After a value is selected (change bubbles from Radix internals), move to the next focusable
    const onChangeCapture = () => {
      const active = document.activeElement as HTMLElement | null
      // Prefer the element that currently holds focus (Radix returns focus to trigger)
      const anchor =
        (active && (active.closest("[role='combobox'], select") as HTMLElement | null)) ||
        lastComboRef.current

      if (!anchor) return

      const form = anchor.closest("form") as HTMLFormElement | null
      if (!form) return

      const focusable = getFocusable(form)
      const idx = resolveIndex(focusable, anchor)
      if (idx === -1) return

      const next = focusable[idx + 1]
      if (!next) return

      // Let the dropdown fully close first
      requestAnimationFrame(() => next.focus())
    }

    document.addEventListener("change", onChangeCapture, true)

    return () => {
      document.removeEventListener("pointerdown", rememberCombo, true)
      document.removeEventListener("keydown", rememberCombo, true)
      document.removeEventListener("change", onChangeCapture, true)
    }
  }, [])

  return handleKeyDown
}
