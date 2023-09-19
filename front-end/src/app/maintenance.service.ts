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

  // TODO - This must be removed when integration with back end is done
  maintenancesList: MaintenanceInfo[] = [
    {
      id: 0,
      licensePlate: 'ABC-1D23',
      description: 'Breaks',
      date: new Date("2023-02-03"),
      value: 123.45,
      readOdometer: 10349,
      referenceOdometer: 10000,
    },
    {
      id: 1,
      licensePlate: 'IJK-7890',
      description: 'Engine',
      date: new Date("2023-05-20"),
      value: 300.00,
      readOdometer: 100000,
      referenceOdometer: 104053,
    },
  ];

  /************************************************************************************************/
  /**
   * \brief  Retrieve all stored maintenances
   * \return  List containing all maintenances
   */
  getAllMaintenances(): MaintenanceInfo[] {
    // TODO - Get it from back end when integration with back end is done
    return this.maintenancesList;
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
    // TODO - Get it from back end when integration with back end is done
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
  getNextMaintenances(): NextMaintenanceInfo[] {
    // TODO - Get it from back end when integration with back end is done
    return this.nextMaintenances;
  }

  /************************************************************************************************/
  /**
   * \brief   Retrieve next maintenance of a specific vehicle
   * \return  Next maintenances
   */
  getNextMaintenance(licensePlate: string): NextMaintenanceInfo | undefined {
    // TODO - Get it from back end when integration with back end is done
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

  /************************************************************************************************/
  /**
   * \brief  Constructor
   */
  constructor() {
    this.vehicleService.getAllVehicles().then((vehicleInfoList: VehicleInfo[]) => {
      this.vehiclesList = vehicleInfoList;
    });

    // Calculate next revisions of each vehicle
    // TODO - Get it from back end when integration with back end is done
    this.vehiclesList.forEach(vehicle => {
      let nextMaintenanceOdometer = this.getNextMaintenanceOdometer(vehicle);
      this.nextMaintenances.push({
        licensePlate: vehicle.licensePlate,
        refOdometer: nextMaintenanceOdometer,
        readOdometer: vehicle.odometer,
        delayed: (vehicle.odometer > nextMaintenanceOdometer)
      });
    });
  }
}
