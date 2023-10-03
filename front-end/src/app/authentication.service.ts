import { Injectable } from '@angular/core';

/**************************************************************************************************/

@Injectable({
  providedIn: 'root'
})

/**************************************************************************************************/
/**
 * \brief  Service class of vehicle service
 */
export class AuthenticationService {
  token = '';

  // API
  url = 'http://localhost:3000';

  saveToken(token: string) {
    this.token = token;
  }

  // TODO alterar para getToken()
  async loadToken() {
    const resp = await fetch(this.url + '/auth/getToken/4');
    const data = await resp.json();
    return data.token;
  }

}
