import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/auth/models';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  menuProfile: MenuItem[] = [];

  showMenuProfile: boolean = false;
  showHamburger: boolean = false;
  public userSession: User | null;

  constructor(private renderer: Renderer2, private _router: Router, private _authenticationService: AuthenticationService) {
    this.userSession = null;
    this._authenticationService.sessionUser.subscribe(x => (this.userSession = x));
  }

  ngOnInit() {
    this.items = [
      {
        label: 'What should I brew today?',
        icon: 'pi pi-fw pi-bolt',
        routerLink: "add"
      },
      {
        label: 'Aggiungi Ricetta',
        icon: 'pi pi-fw pi-plus',
        routerLink: "add"
      },
      {
        label: 'Ricette',
        icon: 'pi pi-fw pi-list',
        routerLink: "recipes"
      }
    ];

    this.menuProfile = [
      {
        label: 'Impostazioni',
        items: [{
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logOut();
          }
        }]
      }
    ];

    this.userSession = this._authenticationService.sessionUserValue;
    this.userSession.avatar = "./../../../assets/birra-bionda-2.png";
  }

  logOut() {
    this._authenticationService.logout();
    this._router.navigate(['/login']);
  }
}
