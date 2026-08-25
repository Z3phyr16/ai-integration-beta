import { componentCatalog } from "../knowledge/component-catalog.js";

import type { DetectedControl, MappedControl } from "../knowledge/types.js";

export const mapControlsToComponents = (
  controls: DetectedControl[],
): MappedControl[] => {
  return controls.map((control) => {
    const normalizedType = control.type === "textbox" ? "input" : control.type;

    const component = componentCatalog.find(
      (c) => c.category === normalizedType,
    );

    return {
      label: control.label,
      component: component?.name ?? "Unknown",
      example: component?.example || "",
      row: control.row,
      column: control.column,
      placeholder: control.placeholder || "",
    };
  });
};
