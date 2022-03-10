import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-randomize',
  templateUrl: './randomize.component.html',
  styleUrls: ['./randomize.component.css']
})
export class RandomizeComponent {
  @Output() randomize: EventEmitter<any> = new EventEmitter();

  onRandomize(): void {
    this.randomize.emit();
  }
}
