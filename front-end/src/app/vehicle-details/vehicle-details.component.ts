import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { VehicleInfo } from '../vehicleinfo';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaintenanceService } from '../maintenance.service';
import { NextMaintenanceInfo } from '../nextmeintenanceinfo';

/**************************************************************************************************/

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})

/**************************************************************************************************/
/**
 * \brief  Component class for display vehicle details
 */
export class VehicleDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  vehicleService = inject(VehicleService);
  maintenanceService = inject(MaintenanceService);
  vehicleInfo: VehicleInfo | undefined;
  nextMaintenance: NextMaintenanceInfo | undefined;

  /************************************************************************************************/
  /**
   * \brief  Constructor
   */
  constructor() {
    const licensePlate = String(this.route.snapshot.params['licensePlate']);
    this.vehicleService.getVehicle(licensePlate);
    this.nextMaintenance = this.maintenanceService.getNextMaintenance(licensePlate);
  }

  /************************************************************************************************/
  /**
   * \brief  Retrieve license plate of the current vehicle
   * \return  String containing the license plate or undefined if not found
   */
  getLicensePlate():string|undefined {
    if (this.vehicleInfo) {
      return this.vehicleInfo.licensePlate.toUpperCase();
    } else {
      return undefined;
    }
  }
}
