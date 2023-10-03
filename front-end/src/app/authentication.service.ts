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

  async isLogged() {
    const resp = await fetch(this.url + '/auth/get', {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    });

    return (resp.status == 200);
  }

}
