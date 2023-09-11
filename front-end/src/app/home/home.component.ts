import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**************************************************************************************************/

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

/**************************************************************************************************/
/**
 * \brief  Home Component
 */
export class HomeComponent {
  /**
   * \brief  Constructor
   */
  constructor() {
  }
}
