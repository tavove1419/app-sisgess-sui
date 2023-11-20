import { INavData } from '@coreui/angular';

export const navItemsAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'INFORMACIÓN',
    title: true
  },
  {
    name: 'Predial',
    url: '/predial',
    iconComponent: { name: 'cil-cursor' }
  },
  {
    name: 'Asignaciones',
    url: '/asignation',
    iconComponent: { name: 'cilTask' }
  },
  {
    name: 'Re-Asignacion',
    url: '/re-asignation',
    iconComponent: { name: 'cilTask' }
  },
  {
    name: 'Registro SUI',
    url: '/register',
    iconComponent: { name: 'cilTask' }
  },
  {
    name: 'Información SUI',
    url: '/sui-information',
    iconComponent: { name: 'cilNotes' }
  },
  {
    name: 'Configuración',
    url: '/config',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Empresa',
        url: '/company',
        iconComponent: { name: 'cilUnderline' }
      },
      {
        name: 'Barrio',
        url: '/neighborhood',
        iconComponent: { name: 'cilUnderline' }
      },
      {
        name: 'Tipologia',
        url: '/config/typology',
        iconComponent: { name: 'cilUnderline' }
      },
      {
        name: 'Usuario',
        url: '/config/user',
        iconComponent: { name: 'cilUnderline' }
      }
    ]
  },
];

export const navItemsUser: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'INFORMACIÓN',
    title: true
  },
  {
    name: 'Registro SUI',
    url: '/register',
    iconComponent: { name: 'cilTask' }
  },
];

export const navItemsCoordinator: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'INFORMACIÓN',
    title: true
  },
  {
    name: 'Predial',
    url: '/predial',
    iconComponent: { name: 'cil-cursor' }
  },
  {
    name: 'Asignaciones',
    url: '/asignation',
    iconComponent: { name: 'cilTask' }
  },
  {
    name: 'Registro SUI',
    url: '/register',
    iconComponent: { name: 'cilTask' }
  },
];
