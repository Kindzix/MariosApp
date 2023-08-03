import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { InfoComponent } from "../info/info.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  receivedMariosCount: number;
  sentMariosCount: number;
  lastMariosData = [
    {
      sender: {
        name: "John Doe",
      },
      marios: 5,
      theme: "Great job on the project!",
      message: "You did an excellent job leading the team and completing the project on time.",
    },
    {
      sender: {
        name: "Jane Smith",
      },
      marios: 10,
      theme: "Thank you for your help!",
      message: "Your assistance was invaluable in resolving the technical issues we faced.",
    },
    {
      sender: {
        name: "John Doe",
      },
      marios: 5,
      theme: "Great job on the project!",
      message: "You did an excellent job leading the team and completing the project on time.",
    },
    {
      sender: {
        name: "Jane Smith",
      },
      marios: 10,
      theme: "Thank you for your help!",
      message: "Your assistance was invaluable in resolving the technical issues we faced.",
    },
    {
      sender: {
        name: "John Doe",
      },
      marios: 5,
      theme: "Great job on the project!",
      message: "You did an excellent job leading the aa team and completing the project on time.",
    },
    {
      sender: {
        name: "Jane Smith",
      },
      marios: 10,
      theme: "Thank you for your help!",
      message: "Your assistance was invaluable in resolving the technical issues we faced.",
    },
    {
      sender: {
        name: "John Doe",
      },
      marios: 5,
      theme: "Great job on the project!",
      message: "You did an excellent job leading the team and completing the project on time.",
    },
    {
      sender: {
        name: "Jane Smith",
      },
      marios: 10,
      theme: "Thank you for your help!",
      message: "Your assistance was invaluable in resolving the technical issues we faced.",
    },
  ];

  constructor(private dialog: MatDialog, private router: Router) {
    this.receivedMariosCount = this.calculateReceivedMariosCount();
    this.sentMariosCount = this.calculateSentMariosCount();
  }

  calculateReceivedMariosCount(): number {
    return this.lastMariosData.reduce((total, mario) => total + mario.marios, 0);
  }

  calculateSentMariosCount(): number {
    return this.lastMariosData.reduce((total, mario) => total + mario.marios, 0);
  }

  Openpopup() {
    this.dialog.open(InfoComponent, {
      width: '714px',
      height: '222px'
    });
  }

  onClickReceived() {
    this.router.navigateByUrl("/received-marios");
  }

  onClickSent() {
    this.router.navigateByUrl("/sent-marios");
  }

  onClickAdd() {
    this.router.navigateByUrl("/add-marios");
  }
}
