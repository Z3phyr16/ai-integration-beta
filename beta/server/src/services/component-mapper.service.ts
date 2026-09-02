import type { DetectedControl, MappedControl } from "../knowledge/types.js";

import { findBestComponent } from "./rag.service.js";

export const mapControlsToComponents = async (
  controls: DetectedControl[],
): Promise<MappedControl[]> => {
  const mapped: MappedControl[] = [];

  for (const control of controls) {
    const matches = await findBestComponent(`
Control Type: ${control.type}

Label: ${control.label}

Placeholder: ${control.placeholder ?? ""}

This control appears in a business form.
Choose the most appropriate Blazor component.
`);

    const component = matches[0];

    if (!component) {
      continue;
    }

    mapped.push({
      label: control.label,
      component: component.name,
      example: component.example,
      hasInternalLabel: component.hasInternalLabel,
      row: control.row,
      column: control.column,
      ...(control.placeholder && {
        placeholder: control.placeholder,
      }),
    });
  }

  return mapped;
};
