import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-recently-used',
  templateUrl: './recently-used.component.html',
  styleUrls: ['./recently-used.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecentlyUsedComponent {
  @Input() names: string[] = [];
  @Output() addPerson: EventEmitter<string> = new EventEmitter<string>();
  @Output() removePerson: EventEmitter<string> = new EventEmitter<string>();

  resetName(name: string, event: MouseEvent): void {
    event.stopPropagation();
    this.removePerson.emit(name);
  }

  onAddPerson(name: string): void {
    this.addPerson.emit(name);
  }
}
