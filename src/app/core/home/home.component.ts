import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { InfoComponent } from "../info/info.component";
import { Router } from "@angular/router";
import { SentMarioService } from "../../services/sent-mario.service";
import { SentMario } from "../../interfaces/sent-mario";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receivedMariosCount: number = 0;
  sentMariosCount: number = 0;
  lastMariosData: SentMario[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private sentMarioService: SentMarioService
  ) {}

  ngOnInit(): void {
    this.fetchData();
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

  fetchData() {
    const senderUuid = '5bdd60f5-dcf9-45f8-8093-c4b08834ebc8';
    const recipientUuid = '5bdd60f5-dcf9-45f8-8093-c4b08834ebc8';

    this.sentMarioService.fetchSentMarios(senderUuid);
    this.sentMarioService.fetchReceivedMarios(recipientUuid);

    this.sentMarioService.sentMarios.subscribe((sentMarios) => {
      this.sentMariosCount = sentMarios.length;
      this.updateLastMariosData(sentMarios);
    });

    this.sentMarioService.sentMarios.subscribe((receivedMarios) => {
      this.receivedMariosCount = receivedMarios.length;
      this.updateLastMariosData(receivedMarios);
    });
  }

  private updateLastMariosData(marios: SentMario[]) {
    this.lastMariosData = [...this.lastMariosData, ...marios];
    this.lastMariosData = this.lastMariosData.slice(0, 9);
  }
}
