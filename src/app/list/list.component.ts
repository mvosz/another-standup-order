import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit, OnDestroy {
  private unfocusSubscription: Subscription;
  private focusfirstSubscription: Subscription;

  @Input() names: string[] = [];
  @Input() onUnfocus: Observable<void>;
  @Input() onFocusFirst: Observable<void>;
  @Output() removePerson: EventEmitter<string> = new EventEmitter<string>();
  @Output() focusPerson: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.focusNext();
    } else if (event.key === 'ArrowUp') {
      this.focusPrev();
    } else if (event.key === 'Escape') {
      this.removeFocus();
    }
  }

  ngOnInit() {
    this.unfocusSubscription = this.onUnfocus.subscribe(() => {
      this.removeFocus();
    });

    this.focusfirstSubscription = this.onFocusFirst.subscribe(() => {
      this.focusFirst();
    });
  }

  ngOnDestroy() {
    this.unfocusSubscription.unsubscribe();
    this.focusfirstSubscription.unsubscribe();
  }

  constructor(public elementRef: ElementRef) {}

  onClose(name: string): void {
    this.removePerson.emit(name);
  }

  onMouseEnter(event: MouseEvent): void {
    (event.target as Element).classList.add('hover');
  }

  onMouseLeave(event: MouseEvent): void {
    (event.target as Element).classList.remove('hover');
  }

  focusFirst(): void {
    this.removeFocus();
    let persons = Array.from(document.getElementsByClassName('person'));
    persons[0].classList.add('focus');
  }

  setFocus(event: MouseEvent): void {
    const persons = Array.from(document.getElementsByClassName('focus'));
    persons.forEach((item) => {
      if (event.target !== item) {
        item.classList.remove('focus');
      }
    });
    (event.target as Element).classList.toggle('focus');
    if ((event.target as Element).classList.contains('focus')) {
      this.focusPerson.emit((event.target as Element).children[0].innerHTML);
    } else {
      this.focusPerson.emit(null);
    }
  }

  focusNext(): void {
    let persons = Array.from(document.getElementsByClassName('person'));
    persons = persons.filter((person) => !person.classList.contains('unused'));
    const focusPerson = persons.findIndex((person) =>
      person.classList.contains('focus')
    );
    const hasNoFocus = focusPerson < 0;

    if (hasNoFocus) {
      persons[0].classList.add('focus');
    } else if (focusPerson + 1 !== persons.length) {
      persons[focusPerson].classList.remove('focus');
      persons[focusPerson + 1].classList.add('focus');
    }
  }

  focusPrev(): void {
    let persons = Array.from(document.getElementsByClassName('person'));
    persons =
      persons.length > 0
        ? persons.filter((person) => !person.classList.contains('unused'))
        : [];
    const focusPerson =
      persons.length > 0
        ? persons.findIndex((person) => person.classList.contains('focus'))
        : 0;

    if (focusPerson > 0) {
      persons[focusPerson].classList.remove('focus');
      persons[focusPerson - 1].classList.add('focus');
    } else if (focusPerson === 0) {
      this.removeFocus();
    }
  }

  removeFocus(): void {
    let persons = Array.from(document.getElementsByClassName('person'));
    persons = persons.filter((person) => !person.classList.contains('unused'));
    persons.forEach((person) => person.classList.remove('focus'));
    this.focusPerson.emit(null);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
