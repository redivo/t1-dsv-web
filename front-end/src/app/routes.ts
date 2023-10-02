import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { MaintenancesComponent } from './maintenances/maintenances.component';
import { RegisterMaintenanceComponent } from './register-maintenance/register-maintenance.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routeConfig: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },
  {
    path: 'error',
    component: AuthenticationComponent,
  },
  {
    path: 'menu',
    component: HomeComponent,
  },
  {
    path: 'vehicleDetails/:licensePlate',
    component: VehicleDetailsComponent,
  },
  {
    path: 'vehicleList',
    component: VehiclesListComponent,
  },
  {
    path: 'addVehicle',
    component: AddEditVehicleComponent,
  },
  {
    path: 'editVehicle/:licensePlate',
    component: AddEditVehicleComponent,
  },
  {
    path: 'maintenances',
    component: MaintenancesComponent,
  },
  {
    path: 'registerMaintenance/:licensePlate/:refOdometer/:readOdometer',
    component: RegisterMaintenanceComponent,
  },
];

export default routeConfig;
