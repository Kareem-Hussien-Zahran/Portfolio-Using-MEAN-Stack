/** A simple "title + description" content block used by many pages. */
export interface InfoItem {
  title: string;
  description: string;
  /** Optional index / label shown above the title (e.g. "01", "MEAN STACK"). */
  number?: string;
  /** Optional secondary line (e.g. "DEPI · 2024 — Present"). */
  meta?: string;
}

/** A node in an architecture diagram. */
export interface ArchNode {
  label: string;
  /** Highlights the node as an AI component. */
  ai?: boolean;
}
