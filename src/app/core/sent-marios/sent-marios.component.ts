import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { InfoComponent } from "../info/info.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sent-marios',
  templateUrl: './sent-marios.component.html',
  styleUrls: ['./sent-marios.component.css']
})
export class SentMariosComponent implements OnInit {
  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  sentMariosData!: any[];
  Mario: any | null = null;

  ngOnInit() {
    this.sentMarios();
  }

  sentMarios() {
    const sampleUser = {
      name: "John Doe",
      sentMarios: [
        {
          id: 1,
          marios: 5,
          theme: "Thank you for your help!",
          message: "You're the best!",
          receiver: { name: "Alice" }
        },
        {
          id: 2,
          marios: 3,
          theme: "Thanks for the support!",
          message: "You rock!",
          receiver: { name: "Bob" }
        }
      ],
    };
    this.sentMariosData = sampleUser.sentMarios;
  }

  Openpopup(mario: any) {
    this.Mario = mario;
    this.dialog.open(InfoComponent, {
      width: '714px',
      height: '222px',
      data: this.Mario
    });
  }

  onClick() {
    this.router.navigateByUrl("");
  }

}
