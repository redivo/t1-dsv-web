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

  // TODO - This must be removed when integration with back end is done
  vehiclesList: VehicleInfo[] = [
    {
      licensePlate: 'abc-1d23',
      name: 'Short distances',
      brand: 'Fiat',
      model: 'Fiorino',
      year: 2020,
      odometer: 12345,
      category: 'Delivery',
    },
    {
      licensePlate: 'efg-4h56',
      name: 'Long distances',
      brand: 'JAC',
      model: 'E-JT9,5',
      year: 2022,
      odometer: 5387,
      category: 'Delivery',
    },
    {
      licensePlate: 'ijk-7890',
      name: 'Cattle truck',
      brand: 'Mercedes Bens',
      model: 'MB 915',
      year: 2006,
      odometer: 123456,
      category: 'Animal truck',
    },
    {
      licensePlate: 'lmn-1234',
      name: 'Office car',
      brand: 'Volkswagen',
      model: 'Saveiro',
      year: 2010,
      odometer: 82456,
      category: 'Auxiliary',
    }
  ];

  /************************************************************************************************/
  /**
   * \brief  Retrieve all vehicles
   * \return  List containing all vehicles
   */

  

  async getAllVehicles(): Promise<VehicleInfo[]>{
    const res = await fetch(this.url+'/veiculos');
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
    const res = await fetch(this.url+'/'+licensePlate);
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
      headers:{'Content-Type':'application/json'},
      mode: 'no-cors',
      body: JSON.stringify(vehicle)
    });
    const data = await res.json();
  }
}
