import { Injectable } from '@angular/core';
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

  //API
  url='http://localhost:3000';

  

  /************************************************************************************************/
  /**
   * \brief  Retrieve all vehicles
   * \return  List containing all vehicles
   */

  

  async getAllVehicles(): Promise<VehicleInfo[]>{
    const res = await fetch(this.url+'/veiculos',{
      mode: 'no-cors',
      headers: {'Access-Control-Allow-Origin':'*'}
    });
    const data = await res.json();
    console.log(data);
    return  data.json;
  }

  /************************************************************************************************/
  /**
   * \brief  Retrieve a specific vehicle
   * \param  String containing license plate of the vehicle
   * \return  VehicleInfo is it was found, undefined otherwise
   */
  async getVehicle(licensePlate: string): Promise<VehicleInfo | undefined> {
    const res = await fetch(this.url+'/'+licensePlate,{
      mode: 'no-cors',
      headers: {'Access-Control-Allow-Origin':'*'}
    });
    const data = await res.json();
    console.log(data);
    return await data.json;
  }

  /************************************************************************************************/
  /**
   * \brief  Add a new vehicle
   * \param  vehicle  Vehicle to me added
   */
  async addVehicle(vehicle: VehicleInfo){
    try{
      const res = await fetch(this.url+'/veiculos', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        mode: 'no-cors',
        body: JSON.stringify(vehicle)
      });
    }catch(error){
      console.log(error);
    }
    
  }

  /************************************************************************************************/
  /**
   * \brief  Edit an existing value
   * \param  vehicle  Vehicle info to be edited
   */
  async editVehicle(vehicle: VehicleInfo) {
    const res = await fetch('http://localhost:3000/veiculos/'+vehicle.licensePlate,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'},
      mode: 'no-cors',
      body: JSON.stringify(vehicle)
    });
    const data = await res.json();
  }
}
