import { Routes } from '@angular/router';

const SUFFIX = ' — Kareem Hussien';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Kareem Hussien — Software Engineer & AI Engineer',
    data: { nav: 'home' },
    loadComponent: () => import('@features/home/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    title: 'About' + SUFFIX,
    data: { nav: 'about' },
    loadComponent: () => import('@features/about/about/about').then((m) => m.About),
  },
  {
    path: 'projects',
    title: 'Projects' + SUFFIX,
    data: { nav: 'projects' },
    loadComponent: () => import('@features/projects/projects/projects').then((m) => m.Projects),
  },
  {
    // the page sets its own title once the project is loaded
    path: 'projects/:slug',
    data: { nav: 'projects' },
    loadComponent: () =>
      import('@features/project-detail/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'ai-engineering',
    title: 'AI Engineering' + SUFFIX,
    data: { nav: 'ai' },
    loadComponent: () =>
      import('@features/ai-engineering/ai-engineering/ai-engineering').then((m) => m.AiEngineering),
  },
  {
    path: 'software-engineering',
    title: 'Software Engineering' + SUFFIX,
    data: { nav: 'swe' },
    loadComponent: () =>
      import('@features/software-engineering/software-engineering/software-engineering').then(
        (m) => m.SoftwareEngineering,
      ),
  },
  {
    path: 'enterprise-ai',
    title: 'Intelligent Enterprise Systems' + SUFFIX,
    data: { nav: 'enterprise' },
    loadComponent: () =>
      import('@features/enterprise-ai/enterprise-ai/enterprise-ai').then((m) => m.EnterpriseAi),
  },
  {
    path: 'machine-learning',
    title: 'Machine Learning' + SUFFIX,
    data: { nav: 'projects' },
    loadComponent: () =>
      import('@features/machine-learning/machine-learning/machine-learning').then((m) => m.MachineLearning),
  },
  {
    path: 'data-analysis',
    title: 'Data Analysis' + SUFFIX,
    data: { nav: 'projects' },
    loadComponent: () =>
      import('@features/data-analysis/data-analysis/data-analysis').then((m) => m.DataAnalysis),
  },
  {
    path: 'skills',
    title: 'Skills' + SUFFIX,
    data: { nav: 'skills' },
    loadComponent: () => import('@features/skills/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'experience',
    title: 'Experience' + SUFFIX,
    data: { nav: 'experience' },
    loadComponent: () => import('@features/experience/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'contact',
    title: 'Contact' + SUFFIX,
    data: { nav: 'contact' },
    loadComponent: () => import('@features/contact/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'future',
    title: 'Future Tracks' + SUFFIX,
    data: { nav: 'ai' },
    loadComponent: () => import('@features/future/future/future').then((m) => m.Future),
  },
  {
    path: 'admin',
    loadChildren: () => import('@features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: '**',
    title: 'Not found' + SUFFIX,
    data: { nav: 'home' },
    loadComponent: () => import('@features/not-found/not-found/not-found').then((m) => m.NotFound),
  },
];
