import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaintenanceService } from '../maintenance.service';
import { MaintenanceInfo } from '../maintenanceinfo';

/**************************************************************************************************/

@Component({
  selector: 'app-maintenances-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './maintenances-list.component.html',
  styleUrls: ['./maintenances-list.component.css']
})

/**************************************************************************************************/

/**
 * \brief  Component class to handle with maintenances list
 */
export class MaintenancesListComponent {
  maintenancesList: MaintenanceInfo[] = [];
  maintenanceService: MaintenanceService = inject(MaintenanceService);

  /************************************************************************************************/
  /**
   * \brief  Constructor
   */
  constructor() {
    this.maintenancesList = this.maintenanceService.getAllMaintenances();
  }
}
