import {Component} from '@angular/core';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(config: NgbNavConfig) {
    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }
}
