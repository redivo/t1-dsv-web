import { Injectable, inject } from '@angular/core';
import { VehicleInfo } from './vehicleinfo';

/**************************************************************************************************/

@Injectable({
  providedIn: 'root'
})

/**************************************************************************************************/
/**
 * \brief  Service class of vehicle service
 */
export class VehicleService {
  // API
  url = 'http://localhost:3000';

  /************************************************************************************************/
  /**
   * \brief  Retrieve all vehicles
   * \return  List containing all vehicles
   */
  async getAllVehicles(): Promise<VehicleInfo[]>{
    const response = await fetch(this.url + '/vehicles', {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  }

  /************************************************************************************************/
  /**
   * \brief  Retrieve a specific vehicle
   * \param  String containing license plate of the vehicle
   * \return  VehicleInfo is it was found, undefined otherwise
   */
  async getVehicle(licensePlate: string): Promise<VehicleInfo | undefined> {
    const response = await fetch(this.url + '/vehicles/' + licensePlate, {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  }

  /************************************************************************************************/
  /**
   * \brief  Add a new vehicle
   * \param  vehicle  Vehicle to me added
   */
  async addVehicle(vehicle: VehicleInfo){
    try{
      const res = await fetch(this.url + '/vehicles', {
        method:'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle)
      });
    } catch(error){
      console.log(error);
    }
  }

  /************************************************************************************************/
  /**
   * \brief  Edit an existing value
   * \param  vehicle  Vehicle info to be edited
   */
  async editVehicle(vehicle: VehicleInfo) {
    const res = await fetch(this.url + '/vehicles/', {
      method:'PUT',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(vehicle)
    });
    const data = await res.json();
  }
}
