import type { MappedControl } from "../knowledge/types.js";

const generateControl = (control: MappedControl): string => {
  switch (control.component) {
    case "CustomInput":
      return `
<CustomInput
    Label="${control.label}"
    Placeholder="${control.placeholder ?? `Enter ${control.label}`}" />
`;

    case "AtomComboBox":
      return `
<AtomComboBox
    Placeholder="${control.placeholder ?? `Select ${control.label}`}" />
`;

    default:
      return `
<!-- Unknown Component: ${control.label} -->
`;
  }
};

export const generateRazor = (controls: MappedControl[]): string => {
  let razor = "";

  const rows = new Map<number, MappedControl[]>();

  // Group controls by row
  controls.forEach((control) => {
    if (!rows.has(control.row)) {
      rows.set(control.row, []);
    }

    rows.get(control.row)?.push(control);
  });

  // Generate layout
  for (const [, rowControls] of rows) {
    // sort columns left -> right
    rowControls.sort((a, b) => a.column - b.column);

    const colSize = Math.floor(12 / rowControls.length);

    razor += `<div class="row">\n`;

    rowControls.forEach((control) => {
      razor += `    <div class="col-md-${colSize}">\n`;
      razor += `<p class="atom-p txt-default-color">${control.label}</p>`;
      razor += generateControl(control)
        .split("\n")
        .map((line) => (line ? `        ${line}` : line))
        .join("\n");

      razor += `\n    </div>\n`;
    });

    razor += `</div>\n\n`;
  }

  return razor.trim();
};
