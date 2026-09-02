export interface ComponentCatalog {
  name: string;
  category: string;
  description: string;
  example: string;
  keywords: string[];
}

export interface DetectedControl {
  type: string;
  label: string;
  placeholder?: string;
  row: number;
  column: number;
}

export interface MappedControl {
  component: string;
  label: string;
  example?: string;
  hasInternalLabel?: boolean;
  placeholder?: string;
  row: number;
  column: number;
}
