import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

/**
 * \brief Authentication component class
 */
export class AuthenticationComponent {

  // API
  url = 'http://localhost:3000';

  token = '';

  async loadToken() {
    const resp = await fetch(this.url + '/auth/getToken/2');
    const data = await resp.json();
    return data.token;
  }

  /**
   * \brief  Constructor method
   */
  constructor() {
    this.loadToken().then((token) => {
      this.token = token;
      console.log(this.token);
    });
  }
}
