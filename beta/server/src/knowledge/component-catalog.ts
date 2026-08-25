import type { ComponentCatalog } from "./types.js";

export const componentCatalog: ComponentCatalog[] = [
  {
    name: "CustomInput",
    category: "input",
    description: "Single line text input",
    keywords: ["input", "textbox"],
    example:
      '<CustomInput @bind-Value="Model.FirstName" Label="First Name" placeholder="Enter First Name"/>',
  },
  {
    name: "AtomComboBox",
    category: "dropdown",
    description: "Dropdown selection",
    keywords: ["dropdown", "select", "combobox"],
    example: '<AtomComboBox Placeholder="Select Item" />',
  },
];
