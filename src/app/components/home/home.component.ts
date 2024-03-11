import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  private _roleConnected: string|null = localStorage.getItem('role');

  get roleConnected(): string | null {
    return this._roleConnected;
  }
}
