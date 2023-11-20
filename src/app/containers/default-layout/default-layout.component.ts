import { Component } from '@angular/core';

import { navItemsAdmin, navItemsCoordinator, navItemsUser } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems: any;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    const rol = sessionStorage.getItem('permission')
    if(rol === 'Administrador') {
      this.navItems = navItemsAdmin
    } else if (rol === 'Coordinador') {
      this.navItems = navItemsCoordinator
    } else {
      this.navItems = navItemsUser
    }
  }
}
