import { Component, Input } from '@angular/core';
import { PropertyListing } from '../../property-listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-listing.component.html',
  styleUrl: './property-listing.component.scss'
})
export class PropertyListingComponent {
  @Input() propertyListing!:PropertyListing; 
}
