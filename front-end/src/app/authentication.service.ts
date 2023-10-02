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

  // API
  url = 'http://localhost:3000';

  async loadToken() {
    const resp = await fetch(this.url + '/auth/getToken/2');
    const data = await resp.json();
    return data.token;
  }

}
