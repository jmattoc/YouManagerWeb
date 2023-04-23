import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute ,NavigationEnd, NavigationStart} from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-layout-auth',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  returnUrl: string = '/';
  error: boolean = false;
  errorOlvideContrasenia: boolean = false;

  form: FormGroup = this.fb.group({
    usuario: [, [Validators.required]],
    password: [, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.form.invalid) {
      return;
    }    
    const loginValues = this.form.value;
    this.authService.login(loginValues['usuario'], loginValues['password'])
      .subscribe(
        () => {
          this.router.navigate(['/dashboard'])
        }
      , () => {
        this.error = true;
      })  
  }
  olvideContrasenia(){
    const loginValues = this.form.value;
    if(loginValues['usuario']==null){
      this.errorOlvideContrasenia=true;
    }else{

    }  
  }
  /*private toggleButton: any;
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private _router: Subscription;

  constructor(private router: Router, private element: ElementRef) {
      this.sidebarVisible = false;
  }
  ngOnInit(){
    const navbar: HTMLElement = this.element.nativeElement;

    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.sidebarClose();
    });
  }
  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const body = document.getElementsByTagName('body')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');

      this.sidebarVisible = true;
  };
  sidebarClose() {
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
  };
  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
          var $layer = document.createElement('div');
          $layer.setAttribute('class', 'close-layer');
          if (body.querySelectorAll('.wrapper-full-page')) {
              document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
          }else if (body.classList.contains('off-canvas-sidebar')) {
              document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
          }
          setTimeout(function() {
              $layer.classList.add('visible');
          }, 100);
          $layer.onclick = function() { //asign a function
            body.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            $layer.classList.remove('visible');
            this.sidebarClose();
          }.bind(this);

          body.classList.add('nav-open');
      } else {
        document.getElementsByClassName("close-layer")[0].remove();
          this.sidebarClose();
      }
  }*/
}
