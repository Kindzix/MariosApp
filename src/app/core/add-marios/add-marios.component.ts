import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { SentMarioService } from '../../services/sent-mario.service';
import { MarioService } from '../../services/mario.service';
import { UserService } from '../../services/user.service';
import {User} from "../../interfaces/user";
import {Mario} from "../../interfaces/mario";
import {SentMarioPayload} from "../../interfaces/sent-mario";


@Component({
  selector: 'app-add-marios',
  templateUrl: './add-marios.component.html',
  styleUrls: ['./add-marios.component.css']
})
export class AddMariosComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [13, 188];

  users: User[] = [];
  allUsers: User[] = [];
  filteredUsers: Observable<string[]>;
  userCtrl = new FormControl();

  categories: Mario[] = [];
  marioTheme = '';
  marioMessage = '';

  constructor(
    private router: Router,
    private sentMarioService: SentMarioService,
    private marioService: MarioService,
    private userService: UserService
  ) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(''),
      map((userInput: string) => userInput ? this._filter(userInput) : this.allUsers.map(user => user.firstName + ' ' + user.lastName))
    );
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchCategories();
  }

  onClick() {
    this.router.navigateByUrl('');
  }

  fetchUsers() {
    this.userService.users.subscribe((data) => {
      this.allUsers = data;
    });
  }

  fetchCategories() {
    this.marioService.marios.subscribe((data) => {
      this.categories = data;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value)
    if (value) {
      const selectedUser = this.allUsers.find(user => user.firstName === value);
      if (selectedUser) {
        this.users.push(selectedUser);
      }
    }

    event.chipInput.clear();
  }

  remove(user: User): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = this.allUsers.find(user => (user.firstName + ' ' + user.lastName) === event.option.viewValue);
    console.log(selectedUser)
    if (selectedUser) {
      this.users.push(selectedUser);
    }

    this.userCtrl.setValue(null);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers
      .filter(user => (user.firstName + ' ' + user.lastName).toLowerCase().includes(filterValue))
      .map(user => user.firstName + ' ' + user.lastName);
  }

  onSubmit() {
    const selectedCategory = this.categories.find(category => category.type === this.marioTheme);

    if (!selectedCategory) {
      console.error('Selected Mario not found.');
      return;
    }

    const payload: SentMarioPayload = {
      mario: selectedCategory,
      theme: this.marioTheme,
      comment: this.marioMessage,
      sender: 'af6b2daf-e36c-43d5-82e5-b310033e49bc',
      recipients: this.users.map(user => user.uuid)
    };


    this.addSentMarios(payload);
  }

  private addSentMarios(payload: SentMarioPayload) {
  }
}
