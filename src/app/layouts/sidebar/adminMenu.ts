import { MenuItem } from './menu.model';

export const ADMINMENU: MenuItem[] = [
    {
        id: 10,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 20,
        isLayout: true
    },
  {
    id: 30,
    label: 'MENUITEMS.PARAMS.TEXT',
    icon: 'bx-home-circle',
    subItems: [
      {
        id: 40,
        label: 'MENUITEMS.PARAMS.LIST.COUNTRY',
        link: '/params/country-list',
        parentId: 30
      },
      {
        id: 50,
        label: 'MENUITEMS.PARAMS.LIST.CITY',
        link: '/params/city-list',
        parentId: 30
      },
      {
        id: 60,
        label: 'MENUITEMS.PARAMS.LIST.REGION',
        link: '/params/region-list',
        parentId: 30
      },
    ]
  },
];

