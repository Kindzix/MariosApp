import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {Mario} from "../../interfaces/mario";
import {MatDialog} from "@angular/material/dialog";
import {SentMarioService} from "../../services/sent-mario.service";
import {MarioService} from "../../services/mario.service";
import {UserService} from "../../services/user.service";
import {SentMarioPayload} from "../../interfaces/sent-mario";
import {User} from "../../interfaces/user";

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

  userCtrl = new FormControl();

  categories: Mario[] = [];
  marioTheme = '';
  marioMessage = '';
  separatorKeysCodes: any;
  users: User[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private sentMarioService: SentMarioService,
    private marioService: MarioService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchCategories();
  }

  onClick() {
    this.router.navigateByUrl('');
  }

  fetchUsers() {
    this.userService.users.subscribe((data) => {
      this.users = data;
    });
  }

  fetchCategories() {
    this.marioService.marios.subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    const selectedMario = this.categories.find(mario => mario.type);

    if (!selectedMario) {
      console.error('Selected Mario not found.');
      return;
    }

    const payload: SentMarioPayload = {
      mario: selectedMario,
      theme: this.marioTheme,
      comment: this.marioMessage,
      sender: 'af6b2daf-e36c-43d5-82e5-b310033e49bc',
      recipients: ['af6b2daf-e36c-43d5-82e5-b310033e49bc']
    };

    //this.addSentMarios(payload);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.userCtrl.setValue(null);
  }

}
