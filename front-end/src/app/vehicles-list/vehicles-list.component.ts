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
export class VehiclesListComponent {
  vehiclesList: VehicleInfo[] = [];
  vehicleService: VehicleService = inject(VehicleService);

  /************************************************************************************************/
  /**
   * \brief  Constructor
   */
  constructor() {
    this.vehiclesList = this.vehicleService.getAllVehicles();
  }
}
