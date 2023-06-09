import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  constructor(private readonly authService: AuthService, private _router: Router) {
  }
  ngOnInit(): void {
    this.authService.logout()
    this._router.navigate(['auth/login']);
  }

}
