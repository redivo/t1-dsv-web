import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleInfo } from '../vehicleinfo';
import { VehicleService } from '../vehicle.service';
import { RouterLink, RouterOutlet } from '@angular/router';

/**************************************************************************************************/
@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})

/**************************************************************************************************/
/**
 * \brief  Component class to vehicles list
 */
export class VehiclesListComponent
{
  vehiclesList: VehicleInfo[] = [];
  vehicleService: VehicleService = inject(VehicleService);

  /************************************************************************************************/
  /**
   * \brief  Constructor
   */
  constructor()  {
    this.vehicleService.getAllVehicles().then((vehiclesList: VehicleInfo[])=>{
      // Clear
      this.vehiclesList = [];

      // Iterate over received vehicles and not use vehicles that are not completely filled
      for (let i = 0; i < vehiclesList.length; i++) {
        if (!vehiclesList[i]["brand"]
            || !vehiclesList[i]["category"]
            || !vehiclesList[i]["licensePlate"]
            || !vehiclesList[i]["model"]
            || !vehiclesList[i]["name"]
            || !vehiclesList[i]["odometer"]
            || !vehiclesList[i]["year"]) {
          // Skip
          continue;
        }

        // If it is completely filled, add
        this.vehiclesList.push(vehiclesList[i]);
      }
    });
  }
}
