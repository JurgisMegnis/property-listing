import { Injectable } from '@angular/core';
import { PropertyListing } from '../property-listing';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  URL = 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json';

  constructor() { }

  async getAllProperties(): Promise<PropertyListing[]> {
    try {
      const response = await fetch(this.URL);
      if (!response.ok) {
        console.error('Network response was not ok:', response.statusText)
        return []
      }
      const data = await response.json()
      return data ?? [];
    } catch (error) {
      console.error('Fetch error', error)
      return []
    }
  }
}
