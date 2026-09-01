import type { DetectedControl, MappedControl } from "../knowledge/types.js";

import { findBestComponent } from "./rag.service.js";

export const mapControlsToComponents = async (
  controls: DetectedControl[],
): Promise<MappedControl[]> => {
  const mapped: MappedControl[] = [];

  for (const control of controls) {
    const component = await findBestComponent(`
Type: ${control.type}
Label: ${control.label}
Placeholder: ${control.placeholder ?? ""}
`);

    if (!component) {
      continue;
    }

    mapped.push({
      label: control.label,
      component: component.name,
      example: component.example,
      row: control.row,
      column: control.column,
      ...(control.placeholder && {
        placeholder: control.placeholder,
      }),
    });
  }

  return mapped;
};
