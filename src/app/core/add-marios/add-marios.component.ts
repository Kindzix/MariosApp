import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatButtonModule} from "@angular/material/button";


export interface User {
  name: string;
}

@Component({
  selector: 'app-add-marios',
  templateUrl: './add-marios.component.html',
  styleUrls: ['./add-marios.component.css'],
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe, MatButtonModule,
  ],
})
export class AddMariosComponent {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  users: string[] = [''];
  allUsers:  string[]  = ['A', 'B', 'C'];
  filteredUsers: Observable<string[]>;
  userCtrl = new FormControl();

  categories: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  marioTheme = '';
  marioMessage = '';

  announcer = inject(LiveAnnouncer);
  constructor(private router: Router) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allUsers.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.users.push(value);
    }

    event.chipInput!.clear();
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
      this.announcer.announce(`Removed ${user}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(): void {
    console.log('Selected Users:', this.users);
    console.log('Selected Categories:', this.categories.slice(0, 5));
    console.log('Mario Theme:', this.marioTheme);
    console.log('Mario Message:', this.marioMessage);
  }

  onClick(): void {
    this.router.navigateByUrl("");
  }
}
