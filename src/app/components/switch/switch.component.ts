import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {
  @Input() label!: string;
  @Output() switchState = new EventEmitter<boolean>();

  onStateChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.switchState.emit(checkbox.checked);
  }
}
