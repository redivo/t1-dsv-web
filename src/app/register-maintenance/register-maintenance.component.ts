import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { MaintenanceInfo } from '../maintenanceinfo';
import { MaintenanceService } from '../maintenance.service';

/**************************************************************************************************/

@Component({
  selector: 'app-register-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-maintenance.component.html',
  styleUrls: ['./register-maintenance.component.css']
})

/**************************************************************************************************/
/**
 * \brief  Register a new maintenance component class
 */
export class RegisterMaintenanceComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  vehicleService = inject(VehicleService);
  maintenanceService = inject(MaintenanceService);
  licensePlate: string = "";
  refOdo: number = 0;
  readOdo: number = 0;
  maintenanceForm: FormGroup;

  /************************************************************************************************/
  /**
   * \brief  Submit form to maintenance srevice
   */
  submitApplication() {
    // Forma maintenance values
    let maintenance:MaintenanceInfo = {
      id: -1,
      licensePlate: this.licensePlate,
      description: String(this.maintenanceForm.value.description),
      date: new Date(),
      value: Number(this.maintenanceForm.value.value),
      readOdometer: Number(this.maintenanceForm.value.readOdometer),
      referenceOdometer: Number(this.refOdo),
    };

    // Send info to maintenance service
    this.maintenanceService.registerMaintenance(maintenance);

    // Redirect to maintenances view
    this.router.navigateByUrl('/maintenances');
  }

  /************************************************************************************************/
  /**
   * \brief  Constructor
   * \param  router  Router object
   */
  constructor(private router: Router) {
    this.router = router;
    this.licensePlate = String(this.route.snapshot.params['licensePlate']);
    this.refOdo = Number(this.route.snapshot.params['refOdometer']);
    this.readOdo = Number(this.route.snapshot.params['readOdometer']);

    // Create form data
    this.maintenanceForm = new FormGroup({
      readOdometer: new FormControl(this.readOdo, [Validators.required,
                                    Validators.min(0)]),
      value: new FormControl(0, [Validators.required,
                                    Validators.min(0)]),
      description: new FormControl('', [Validators.required,
                                    Validators.minLength(5)]),
    });
  }
}
