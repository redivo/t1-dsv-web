import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/**************************************************************************************************/

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

/**************************************************************************************************/
/**
 * \brief Authentication component class
 */
export class AuthenticationComponent {
  token = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthenticationService = inject(AuthenticationService);

  /************************************************************************************************/
  /**
   * \brief  Redirect to authentication link
   */
  goToAuthentication() {
    window.location.href='http://localhost:3000/auth/google';
  }

  /************************************************************************************************/
  /**
   * \brief  Constructor method
   */
  constructor() {
    this.token = String(this.route.snapshot.params['token']);
    this.authService.saveToken(this.token);
    console.log(this.token);
  }
}
