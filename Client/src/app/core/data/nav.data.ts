import { NavItem } from '../models/nav.model';

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'ai', label: 'AI Engineering', path: '/ai-engineering' },
  { key: 'swe', label: 'Software Engineering', path: '/software-engineering' },
  { key: 'enterprise', label: 'Enterprise AI', path: '/enterprise-ai' },
  { key: 'skills', label: 'Skills', path: '/skills' },
  { key: 'experience', label: 'Experience', path: '/experience' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];
