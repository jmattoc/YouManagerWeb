import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router } from "@angular/router";
// import $ from "jquery";
// declare const $: any;
//var $ = require("jquery");
import * as $ from 'jquery';
import { AuthService } from '@core/auth/auth.service';
//Metadata
export interface RouteInfo {
  id?:Number;
  path: string;
  title?: string;
  type?: string;
  icontype?: string;

  collapse?: string;
  ab?: string;
  children?: RouteInfo[];
  listAcciones?:[];
}

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {  
  ROUTES: RouteInfo[] = [];
  public menuItems: any = [];
  name!: String;
  nameperfil!: string;
  roles!:string;
  public menuItemsperfilpuestos: any = [];
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  logout() {

    this.authService.signOut();
    setTimeout(() => {
      this.router.navigateByUrl("/");
    }, 1000);
    //window.location.reload();
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  ngOnInit() {

    this.ROUTES= JSON.parse(localStorage.getItem('listOpciones'));
    this.name = this.authService.getName();
    this.nameperfil = this.authService.getNameperfil();
    this.menuItems = this.ROUTES.filter(menuItem => menuItem);
    this.roles = this.authService.getRol();
    //console.log('menus',JSON.stringify(JSON.parse(localStorage.getItem('listOpciones'))));



  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}


