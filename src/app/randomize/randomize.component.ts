import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-randomize',
  templateUrl: './randomize.component.html',
  styleUrls: ['./randomize.component.css']
})
export class RandomizeComponent {
  @Input() names: string[] = [];
  @Output() randomize: EventEmitter<any> = new EventEmitter();

  onRandomize(): void {
    this.randomize.emit();
  }
}
