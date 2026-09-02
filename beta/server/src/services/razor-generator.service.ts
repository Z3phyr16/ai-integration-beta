import type { MappedControl } from "../knowledge/types.js";

const renderTemplate = (control: MappedControl): string => {
  if (!control.example) {
    return `<!-- Missing template for ${control.component} -->`;
  }

  return control.example
    .replaceAll("{{label}}", control.label)
    .replaceAll("{{placeholder}}", control.placeholder ?? "");
};

export const generateRazor = (controls: MappedControl[]): string => {
  let razor = "";

  const rows = new Map<number, MappedControl[]>();

  controls.forEach((control) => {
    if (!rows.has(control.row)) {
      rows.set(control.row, []);
    }

    rows.get(control.row)?.push(control);
  });

  for (const [, rowControls] of rows) {
    rowControls.sort((a, b) => a.column - b.column);

    const colSize = Math.floor(12 / rowControls.length);

    razor += `<div class="row">\n`;

    rowControls.forEach((control) => {
      razor += `    <div class="col-md-${colSize}">\n`;

      if (!control.hasInternalLabel) {
        razor += `<p class="atom-p txt-default-color">${control.label}</p>\n`;
      }

      razor += renderTemplate(control)
        .split("\n")
        .map((line) => (line ? `        ${line}` : line))
        .join("\n");

      razor += `\n    </div>\n`;
    });

    razor += `</div>\n\n`;
  }

  return razor.trim();
};
