import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListingComponent } from '../property-listing/property-listing.component';
import { PropertyListing } from '../../property-listing';
import { PropertiesService } from '../../services/properties.service';
import { SegmentControlComponent } from "../segment-control/segment-control.component";
import { SwitchComponent } from "../switch/switch.component";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PropertyListingComponent, CommonModule, SegmentControlComponent, SwitchComponent, DropdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly ALL_STAYS = 'All stays' as const;
  propertyList: PropertyListing[] = [];
  propertyService: PropertiesService = inject(PropertiesService);
  filteredPropertyList: PropertyListing[] = [];
  locationList: string[] = [];
  bedroomTypes: string[] = [];
  private filters: Array<(item: PropertyListing) => boolean> = [];
  private locationFilter: ((property: any) => boolean) | null = null;
  private superhostFilter: ((property: any) => boolean) | null = null;
  private typeFilter: ((property: any) => boolean) | null = null;

  async ngOnInit(): Promise<void> {
    await this.loadPropertyItems();
    this.getLocations();
    this.getBedroomTypes();
  
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

  getBedroomTypes(): void {
    let fullBedroomArray = [...new Set(this.propertyList
      .map(locationItem => locationItem.capacity.bedroom)
      .filter(Boolean))]; // get the unique bedroom type numbers (unique as we are using Set) and remove any null/undefiend values

    this.bedroomTypes = fullBedroomArray.map(
      (bedroomCount: number): string => {
        if (bedroomCount === 1) {
          return bedroomCount + ' bedroom';
        } else {
          return bedroomCount + ' bedrooms';
        }
       }
    ); // populate the bedroomTypes array with bedroom count numbers and add the word 'bedroom/s' to each string in the array

    this.bedroomTypes.sort(); // sort the array so it starts with the smallest value
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
      this.superhostFilter = null; // if superhost is true don't filter
    } else {
      this.superhostFilter = (superhost) => superhost.superhost === false; // if superhost is false only show non-superhost properties
    }
    this.updateFilters()
  }

  /* checks the selected value of the priperty type selector and add it to the filters array */
  filterByType(value: string) {
    if (value === 'all') {
      this.typeFilter = null; // if all property types are selected don't filter
    } else {
      this.typeFilter = (type) => type.capacity.bedroom === Number(value[0]);
    }
    this.updateFilters();
  }

  /* clear the filters array and update it with newly selected values  */
  updateFilters() {
    this.filters = [];
    if (this.locationFilter) this.filters.push(this.locationFilter);
    if (this.superhostFilter) this.filters.push(this.superhostFilter);
    if (this.typeFilter) this.filters.push(this.typeFilter)
    this.filter()
  }
  
  /* filter the propertyList array */
  filter() {
    console.log(this.filters)
    this.filteredPropertyList = this.propertyList.filter(property => 
      this.filters.every(filter => filter(property)))
  }
}
