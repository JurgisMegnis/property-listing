import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-segment-control',
  standalone: true,
  imports: [],
  templateUrl: './segment-control.component.html',
  styleUrl: './segment-control.component.scss'
})
export class SegmentControlComponent {
  @Input() locationItem!:string;
  @Input() isFirst: boolean = false;

  @Output() selectionChange = new EventEmitter<string>();

  onInputChange(value: string) {
    this.selectionChange.emit(value);
  }
}
