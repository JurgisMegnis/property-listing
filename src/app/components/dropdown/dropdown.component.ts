import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() propertyType!: string[];

  @Output() selectionChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    if (value) {
      this.selectionChange.emit(value);
    } else {
      console.warn('Selected value is empty or invalid')
    }
    
  }

}
