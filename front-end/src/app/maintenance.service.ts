import { Injectable, inject } from '@angular/core';
import { MaintenanceInfo } from './maintenanceinfo';
import { VehicleService } from './vehicle.service';
import { VehicleInfo } from './vehicleinfo';
import { NextMaintenanceInfo } from './nextmeintenanceinfo';

/**************************************************************************************************/

@Injectable({
  providedIn: 'root'
})

/**************************************************************************************************/
/**
 * \brief  Service class for maintenance service
 */
export class MaintenanceService {
  static maintenanceStep: number = 10000;
  vehicleService: VehicleService = inject(VehicleService);
  vehiclesList: VehicleInfo[] = [];
  nextMaintenances: NextMaintenanceInfo[] = [];

  // API
  url = 'http://localhost:3000';
  maintenancesList: MaintenanceInfo[] = [];

  /************************************************************************************************/
  /**
   * \brief  Retrieve all stored maintenances
   * \return  List containing all maintenances
   */
  async getAllMaintenances(): Promise<MaintenanceInfo[]> {
    const response = await fetch(this.url+'/maintenances');
    const data = await response.json();

    // Iterate over received data and convert string data do Date object
    for (let i = 0; i < data.length; i++) {
      data[i]['date'] = new Date(data[i]['date']);
    }

    return data;
  }

  /************************************************************************************************/
  /**
   * \brief  Retrieve reference odometer to the next maintenance of a specific vehicle
   * \return  Reference odometer
   */
  getNextMaintenanceOdometer(vehicle: VehicleInfo): number {
    // Calculate the rounded km based on read odometer
    let roundedOdo = Math.round(vehicle.odometer/MaintenanceService.maintenanceStep)
        * MaintenanceService.maintenanceStep;

    // If the maintenance was already done, get the next
    if (this.maintenancesList.find(maintenance =>
                                   (maintenance.licensePlate.toLowerCase()
                                        === vehicle.licensePlate.toLowerCase()
                                   && maintenance.referenceOdometer === roundedOdo))) {
      roundedOdo += MaintenanceService.maintenanceStep;
    }

    return roundedOdo;
  }

  /************************************************************************************************/
  /**
   * \brief  Retrieve next maintenances for all vehicles
   * \return  List containing next maintenances
   */
  async getNextMaintenances(): Promise<NextMaintenanceInfo[]> {
    // First, get all vehicles and maintenances
    this.vehiclesList =  await this.vehicleService.getAllVehicles();
    this.maintenancesList = await this.getAllMaintenances();

    // And clear old maintenances
    this.nextMaintenances = [];

    // Then next revisions of each vehicle
    this.vehiclesList.forEach(vehicle => {
      let nextMaintenanceOdometer = this.getNextMaintenanceOdometer(vehicle);
      this.nextMaintenances.push({
        licensePlate: vehicle.licensePlate,
        refOdometer: nextMaintenanceOdometer,
        readOdometer: vehicle.odometer,
        delayed: (vehicle.odometer > nextMaintenanceOdometer)
      });
    });

    return this.nextMaintenances;
  }

  /************************************************************************************************/
  /**
   * \brief   Retrieve next maintenance of a specific vehicle
   * \return  Next maintenances
   */
  async getNextMaintenance(licensePlate: string): Promise<NextMaintenanceInfo | undefined> {
    await this.getNextMaintenances();
    return this.nextMaintenances.find(maintenance =>
                                      (maintenance.licensePlate.toLowerCase()
                                        === licensePlate.toLowerCase()));
  }

  /************************************************************************************************/
  /**
   * \brief  Register a new maintenance
   * \param  maintenance  Maintenance to be stored
   */
  registerMaintenance(maintenance: MaintenanceInfo) {
    maintenance.id = this.maintenancesList.length;

    // TODO - Call back end when the integration is done
    this.maintenancesList.push(maintenance);
  }
}
