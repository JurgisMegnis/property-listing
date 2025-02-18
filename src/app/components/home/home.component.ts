import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListingComponent } from '../property-listing/property-listing.component';
import { PropertyListing } from '../../property-listing';
import { PropertiesService } from '../../services/properties.service';
import { SegmentControlComponent } from "../segment-control/segment-control.component";
import { SwitchComponent } from "../switch/switch.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PropertyListingComponent, CommonModule, SegmentControlComponent, SwitchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly ALL_STAYS = 'All stays' as const;
  propertyList: PropertyListing[] = [];
  propertyService: PropertiesService = inject(PropertiesService);
  filteredPropertyList: PropertyListing[] = [];
  locationList: string[] = [];
  private filters: Array<(item: PropertyListing) => boolean> = [];
  private locationFilter: ((property: any) => boolean) | null = null;
  private superhostFilter: ((property: any) => boolean) | null = null;



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

  /* FILTER LOGIC */
  /* checks the selected value of the location selector and add it to the filters array */
  filterByLocation(value: string) {
    if (value === this.ALL_STAYS) {
      this.locationFilter = (locationItem) => true // if the selected value is 'All stays' display full array 
    } else {
      this.locationFilter = (locationItem) => locationItem.location === value;
    }
    this.updateFilters()
  }

  /* checks the selected value of the superhost selector and add it to the filters array */
  filterSuperhost(value: boolean) {
    if (value) {
      this.superhostFilter = null; // if superhost is true remove this filter
    } else {
      this.superhostFilter = (superhost) => superhost.superhost === false; // if superhost is false only show non-superhost properties
    }
    this.updateFilters()
  }

  /* clear the filters array and update it with newly selected values  */
  updateFilters() {
    this.filters = [];
    if (this.locationFilter) this.filters.push(this.locationFilter);
    if (this.superhostFilter) this.filters.push(this.superhostFilter);
    this.filter()
  }
  
  /* filter the propertyList array */
  filter() {
    this.filteredPropertyList = this.propertyList.filter(property => 
      this.filters.every(filter => filter(property)))
  }
}
