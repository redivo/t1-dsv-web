import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication.service';

/**************************************************************************************************/

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

/**************************************************************************************************/
/**
 * \brief Authentication component class
 */
export class AuthenticationComponent {
  token = '';
  authService: AuthenticationService = inject(AuthenticationService);

  /************************************************************************************************/
  /**
   * \brief  Redirect to authentication link
   */
  goToAuthentication() {
    window.location.href='http://www.google.com/';
  }

  /************************************************************************************************/
  /**
   * \brief  Constructor method
   */
  constructor() {
    this.authService.loadToken().then((token) => {
      this.token = token;
      console.log(this.token);
    });
  }
}
