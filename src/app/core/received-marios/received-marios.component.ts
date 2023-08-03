import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { InfoComponent } from "../info/info.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-received-marios',
  templateUrl: './received-marios.component.html',
  styleUrls: ['./received-marios.component.css']
})
export class ReceivedMariosComponent implements OnInit {

  receivedMariosData: any[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.receivedMarios();
  }

  receivedMarios() {
    const sampleUser = {
      name: "John Doe",
      receivedMarios: [
        {
          id: 1,
          marios: 5,
          theme: "Thank you for your help!",
          message: "You're the best!",
          sender: { name: "Sender 1" }
        },
        {
          id: 2,
          marios: 3,
          theme: "Thanks for the support!",
          message: "You rock!",
          sender: { name: "Sender 2" }
        }
      ],
    };
    this.receivedMariosData = sampleUser.receivedMarios;
  }

  Openpopup() {
    this.dialog.open(InfoComponent, {
      width: '714px',
      height: '222px'
    });
  }

  onClick() {
    this.router.navigateByUrl("");
  }

}
