import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenancesListComponent } from '../maintenances-list/maintenances-list.component';
import { NextMaintenancesListComponent } from '../next-maintenances-list/next-maintenances-list.component';

/**************************************************************************************************/

@Component({
  selector: 'app-maintenances',
  standalone: true,
  imports: [
    CommonModule,
    MaintenancesListComponent,
    NextMaintenancesListComponent,
  ],
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.css']
})

/**************************************************************************************************/
/**
 * \brief  Maintenances component class
 */
export class MaintenancesComponent {
}
