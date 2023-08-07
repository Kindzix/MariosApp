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
import { User } from '../../interfaces/user';
import { Mario } from '../../interfaces/mario';
import { SentMarioPayload } from '../../interfaces/sent-mario';

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
  selectedCategoryType: string = '';

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
    if (value) {
      const selectedUser = this.allUsers.find(user => (user.firstName + ' ' + user.lastName) === value);
      if (selectedUser && selectedUser.uuid !== 'af6b2daf-e36c-43d5-82e5-b310033e49bc') {
        const userAlreadyAdded = this.users.find(user => user.uuid === selectedUser.uuid);
        if (!userAlreadyAdded) {
          this.users.push(selectedUser);
        }
      }
    }

    event.chipInput!.clear();
  }

  remove(user: User): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = this.allUsers.find(user => (user.firstName + ' ' + user.lastName) === event.option.viewValue);
    if (selectedUser && selectedUser.uuid !== 'af6b2daf-e36c-43d5-82e5-b310033e49bc') {
      const userAlreadyAdded = this.users.find(user => user.uuid === selectedUser.uuid);
      if (!userAlreadyAdded) {
        this.users.push(selectedUser);
      }
    }

    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUsers
      .filter(user => (user.firstName + ' ' + user.lastName).toLowerCase().includes(filterValue) && user.uuid !== 'af6b2daf-e36c-43d5-82e5-b310033e49bc')
      .map(user => user.firstName + ' ' + user.lastName);
  }

  onSubmit() {
    if (this.marioTheme.length > 20 || this.marioMessage.length > 200) {
      console.error('Theme or comment length exceeds the limit.');
      return;
    }

    const selectedCategory = this.categories.find(category => category.type === this.selectedCategoryType);
    if (!selectedCategory) {
      console.error('Selected Category not found.');
      return;
    }

    const payload: SentMarioPayload = {
      marioUuid: selectedCategory.uuid,
      theme: this.marioTheme,
      comment: this.marioMessage,
      senderUuid: 'af6b2daf-e36c-43d5-82e5-b310033e49bc',
      recipientUuids: this.users.map(user => user.uuid)
    };

    this.addSentMarios(payload);
    console.log(payload);
    alert('Mario sent successfully!');
  }

  private addSentMarios(payload: SentMarioPayload) {
    this.sentMarioService.addSentMarios(payload);
    console.log('Mario sent:', payload);
    alert('Mario sent successfully!');
    this.marioTheme = '';
    this.marioMessage = '';
    this.users = [];
  }

}
