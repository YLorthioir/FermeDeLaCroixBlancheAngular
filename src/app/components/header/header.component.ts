import {Component} from '@angular/core';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(config: NgbNavConfig, private readonly _authService: AuthService) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  get roleConnected(): string | null {
    return this._authService.roleConnected();
  }
}
