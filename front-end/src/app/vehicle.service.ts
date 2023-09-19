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
  backEndUrl = 'http://localhost:3000/';

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
  async getAllVehicles(): Promise<VehicleInfo[]> {

    const data = await fetch(this.backEndUrl + 'veiculos');

    console.log(data.json());

    return await data.json() ?? [];
  }

  /************************************************************************************************/
  /**
   * \brief  Retrieve a specific vehicle
   * \param  String containing license plate of the vehicle
   * \return  VehicleInfo is it was found, undefined otherwise
   */
  getVehicle(licensePlate: string): VehicleInfo | undefined {
    // TODO - Get it from back end when integration with back end is done
    return this.vehiclesList.find(vehicle =>
                                  vehicle.licensePlate.toLowerCase() === licensePlate.toLowerCase());
  }

  /************************************************************************************************/
  /**
   * \brief  Add a new vehicle
   * \param  vehicle  Vehicle to me added
   */
  addVehicle(vehicle: VehicleInfo) {
    // TODO - Send it to back end when integration with back end is done
    this.vehiclesList.push(vehicle);
  }

  /************************************************************************************************/
  /**
   * \brief  Edit an existing value
   * \param  vehicle  Vehicle info to be edited
   */
  editVehicle(vehicle: VehicleInfo) {
    // TODO - Send it to back end when integration with back end is done
  }
}
