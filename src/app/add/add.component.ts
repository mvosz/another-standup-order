import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements AfterViewInit {
  @Output() addName: EventEmitter<string> = new EventEmitter();

  @ViewChild('nameInput', { static: false })
  nameInput!: { nativeElement: { focus: () => void; }; };

  public form: FormGroup = new FormGroup({
    name: new FormControl()
  });

  onAdd(newName: string): void {
    this.addName.emit(newName);
    this.form.reset();
  }

  ngAfterViewInit(): void {
    //this.nameInput.nativeElement.focus();
  }

}
