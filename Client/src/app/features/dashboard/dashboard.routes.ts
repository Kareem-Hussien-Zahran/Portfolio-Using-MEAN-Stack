import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';

const TITLE = ' — Dashboard';

/** Lazy-loaded under `/admin`. The login page is public; everything else needs a valid admin token. */
export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'login',
    title: 'Sign in' + TITLE,
    loadComponent: () => import('./dashboard-login/dashboard-login').then((m) => m.DashboardLogin),
  },
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () => import('./dashboard-shell/dashboard-shell').then((m) => m.DashboardShell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Overview' + TITLE,
        loadComponent: () => import('./dashboard-overview/dashboard-overview').then((m) => m.DashboardOverview),
      },
      {
        path: 'projects',
        title: 'Projects' + TITLE,
        loadComponent: () => import('./projects-admin/projects-admin').then((m) => m.ProjectsAdmin),
      },
      {
        path: 'projects/new',
        title: 'New project' + TITLE,
        loadComponent: () => import('./project-form/project-form').then((m) => m.ProjectForm),
      },
      {
        path: 'projects/:id',
        title: 'Edit project' + TITLE,
        loadComponent: () => import('./project-form/project-form').then((m) => m.ProjectForm),
      },
      {
        path: 'skills',
        title: 'Skills' + TITLE,
        loadComponent: () => import('./skills-admin/skills-admin').then((m) => m.SkillsAdmin),
      },
      {
        path: 'experience',
        title: 'Experience' + TITLE,
        loadComponent: () => import('./experience-admin/experience-admin').then((m) => m.ExperienceAdmin),
      },
      {
        path: 'profile',
        title: 'Profile' + TITLE,
        loadComponent: () => import('./profile-admin/profile-admin').then((m) => m.ProfileAdmin),
      },
      {
        path: 'messages',
        title: 'Messages' + TITLE,
        loadComponent: () => import('./messages-admin/messages-admin').then((m) => m.MessagesAdmin),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
