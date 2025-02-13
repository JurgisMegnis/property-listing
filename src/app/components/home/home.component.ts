import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListingComponent } from '../property-listing/property-listing.component';
import { PropertyListing } from '../../property-listing';
import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PropertyListingComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  propertyList: PropertyListing[] = [];
  propertyService: PropertiesService = inject(PropertiesService);

  ngOnInit(): void {
    this.loadPropertyItems();
  }

  async loadPropertyItems() {
    this.propertyList = await this.propertyService.getAllProperties()
  }

}
