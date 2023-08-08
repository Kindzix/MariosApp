import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { InfoComponent } from "../info/info.component";
import { Router } from "@angular/router";
import { SentMarioService } from "../../services/sent-mario.service";
import { SentMario } from "../../interfaces/sent-mario";
import {InfoMariosComponent} from "../info-marios/info-marios.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receivedMariosCount: number = 0;
  sentMariosCount: number = 0;
  lastMariosData: SentMario[] = [];
  lastReceivedMariosData: SentMario[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private sentMarioService: SentMarioService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  Openpopup(mario: SentMario) {
    this.dialog.open(InfoComponent, {
      width: '714px',
      height: '222px',
      data: { mario: mario }
    });
  }

  Openp(mario: SentMario) {
    this.dialog.open(InfoMariosComponent, {
      width: '714px',
      height: '222px',
      data: { mario: mario }
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
    const senderUuid = '8885c1a9-3dfc-453d-bd37-0129d0f62473';
    const recipientUuid = '8885c1a9-3dfc-453d-bd37-0129d0f62473';

    this.sentMarioService.fetchSentMarios(senderUuid);
    this.sentMarioService.fetchReceivedMarios(recipientUuid);

    this.sentMarioService.sentMarios.subscribe((sentMarios) => {
      this.sentMariosCount = sentMarios.length;
      this.updateSentLastMariosData(sentMarios);
    });

    this.sentMarioService.receivedMarios.subscribe((receivedMarios) => {
      this.receivedMariosCount = receivedMarios.length;
      this.updateReceivedLastMariosData(receivedMarios);
    });
  }

  private updateSentLastMariosData(marios: SentMario[]) {
    this.lastReceivedMariosData = marios.slice(0, 9);
    console.log(marios);
  }

  private updateReceivedLastMariosData(marios: SentMario[]) {
    this.lastMariosData = marios.slice(0, 9);
  }

}
