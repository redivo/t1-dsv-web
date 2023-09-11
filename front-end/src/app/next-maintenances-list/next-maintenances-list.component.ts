import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaintenanceService } from '../maintenance.service';
import { MaintenanceInfo } from '../maintenanceinfo';
import { NextMaintenanceInfo } from '../nextmeintenanceinfo';

/**************************************************************************************************/

@Component({
  selector: 'app-next-maintenances-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './next-maintenances-list.component.html',
  styleUrls: ['./next-maintenances-list.component.css']
})

/**************************************************************************************************/
/**
 * \brief  Next maintenances list component class
 */
export class NextMaintenancesListComponent {
  static maintenanceStep: number = 10000;
  maintenancesList: MaintenanceInfo[] = [];
  maintenanceService: MaintenanceService = inject(MaintenanceService);
  nextMaintenances: NextMaintenanceInfo[] = [];

  /************************************************************************************************/
  /**
   * \brief  Constructor
   */
  constructor() {
    this.maintenancesList = this.maintenanceService.getAllMaintenances();
    this.nextMaintenances = this.maintenanceService.getNextMaintenances();
  }
}
