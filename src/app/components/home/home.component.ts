import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListingComponent } from '../property-listing/property-listing.component';
import { PropertyListing } from '../../property-listing';
import { PropertiesService } from '../../services/properties.service';
import { SegmentControlComponent } from "../segment-control/segment-control.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PropertyListingComponent, CommonModule, SegmentControlComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly ALL_STAYS = 'All stays' as const;
  propertyList: PropertyListing[] = [];
  propertyService: PropertiesService = inject(PropertiesService);
  filteredPropertyList: PropertyListing[] = [];
  locationList: string[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadPropertyItems();
    this.getLocations();
  
  }

  async loadPropertyItems(): Promise<void> {
    this.propertyList = await this.propertyService.getAllProperties();
    this.filteredPropertyList = this.propertyList;
  }

  getLocations(): void {
    const fullLocationsArray = this.propertyList
      .map(locationItem => locationItem.location)
      .filter(Boolean); // get all of the location values and remove any null/undefiened values
    
    this.locationList = [...new Set(fullLocationsArray)]
      .sort((a, b) => a.localeCompare(b)); // remove all of the duplicate values and sort the array alphabetically
    
    this.locationList.unshift(this.ALL_STAYS) // add an item in front of the array
  }

  /* checks the selected value of the location selector and filters the object accordingly  */
  filterByLocation(value: string) {
      switch (value) {
        case this.ALL_STAYS:
          this.filteredPropertyList = this.propertyList
          break;
        case "Finland":
          this.filteredPropertyList = this.propertyList.filter(propertyItem => propertyItem.location === "Finland")
          break;
        case "Norway":
          this.filteredPropertyList = this.propertyList.filter(propertyItem => propertyItem.location === "Norway")
          break;
        case "Sweden":
          this.filteredPropertyList = this.propertyList.filter(propertyItem => propertyItem.location === "Sweden")
          break;
        case "Switzerland":
          this.filteredPropertyList = this.propertyList.filter(propertyItem => propertyItem.location === "Switzerland")
          break;
      } 
  }

}
