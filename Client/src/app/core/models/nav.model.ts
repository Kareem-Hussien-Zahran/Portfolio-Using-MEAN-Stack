export type NavKey =
  | 'home' | 'about' | 'projects' | 'ai' | 'swe'
  | 'enterprise' | 'skills' | 'experience' | 'contact';

export interface NavItem {
  key: NavKey;
  label: string;
  path: string;
}
