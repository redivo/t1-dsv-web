import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { VehicleInfo } from '../vehicleinfo';

/**************************************************************************************************/

@Component({
  selector: 'app-add-edit-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.css']
})

/**************************************************************************************************/
/**
 * \brief  Add or edit a vehicle
 */
export class AddEditVehicleComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  vehicleService = inject(VehicleService);
  title: string = "New vehicle";
  button: string = "Add";
  edit: boolean = false;
  initNameVal: string = '';
  initLicensePlateVal: string = '';
  initBrandVal: string = '';
  initModelVal: string = '';
  initYearVal: number = 0;
  initOdometerVal: number = 0;
  initCategoryVal: string = '';
  vehicleForm: FormGroup;

  /************************************************************************************************/
  /**
   * \brief  Submit add or edit form to back end
   */
  submitApplication() {
    // Format data
    let vehicle: VehicleInfo = {
      licensePlate: String(this.vehicleForm.value.licensePlate),
      name: String(this.vehicleForm.value.name),
      brand: String(this.vehicleForm.value.brand),
      model: String(this.vehicleForm.value.model),
      year: Number(this.vehicleForm.value.year),
      odometer: Number(this.vehicleForm.value.odometer),
      category: String(this.vehicleForm.value.category),
    };

    // Call addition or edition of vehicle service
    if (this.edit) {
      this.vehicleService.editVehicle(vehicle);
    } else {
      this.vehicleService.addVehicle(vehicle);
    }

    // Redirect to vehicle list
    this.router.navigateByUrl('/vehicleList');
  }

  /************************************************************************************************/
  /**
   * \brief  Create form group
   * \param  router  Router object
   */
  createFormGroup() {
    let form = new FormGroup({
      name: new FormControl(this.initNameVal, [Validators.required,
                                 Validators.minLength(1),
                                 Validators.maxLength(20)]),
      licensePlate: new FormControl(this.initLicensePlateVal, [Validators.required,
                                         Validators.minLength(7),
                                         Validators.maxLength(8)]),
      brand: new FormControl(this.initBrandVal, [Validators.required,
                                  Validators.minLength(1),
                                  Validators.maxLength(20)]),
      model: new FormControl(this.initModelVal, [Validators.required,
                                  Validators.minLength(1),
                                  Validators.maxLength(20)]),
      year: new FormControl(this.initYearVal, [Validators.required,
                                 Validators.min(0)]),
      odometer: new FormControl(this.initOdometerVal, [Validators.required,
                                     Validators.min(0)]),
      category: new FormControl(this.initCategoryVal, [Validators.required,
                                     Validators.minLength(1),
                                     Validators.maxLength(20)]),
    });

    return form;
  }

  /************************************************************************************************/
  /**
   * \brief  Constructor
   * \param  router  Router object
   */
  constructor(private router: Router) {
    this.router = router;

    // Create form data
    this.vehicleForm = this.createFormGroup();

    // If license plate was given, its an edition
    if (String(this.route.snapshot.url).includes('editVehicle')) {
      this.title = 'Edit vehicle';
      this.button = "Edit";
      this.edit = true;
      this.vehicleService.getVehicle(this.route.snapshot.params['licensePlate']).then((vehicle) => {
        if (vehicle) {
          this.initNameVal = vehicle.name;
          this.initLicensePlateVal = vehicle.licensePlate;
          this.initBrandVal = vehicle.brand;
          this.initModelVal = vehicle.model;
          this.initYearVal = vehicle.year;
          this.initOdometerVal = vehicle.odometer;
          this.initCategoryVal = vehicle.category;
        }
        this.vehicleForm = this.createFormGroup();
      });
    }
  }
}
