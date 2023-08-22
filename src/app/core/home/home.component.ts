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
    const senderUuid = '43245b44-6aa4-4bd4-92bd-ebf98ebe845e';
    const recipientUuid = '43245b44-6aa4-4bd4-92bd-ebf98ebe845e';

    this.sentMarioService.fetchSentMarios(senderUuid);
    this.sentMarioService.fetchReceivedMarios(recipientUuid);

    this.sentMarioService.sentMarios.subscribe((sentMarios) => {
      this.sentMariosCount = sentMarios.length;
      this.sentMarioService.receivedMarios.subscribe((receivedMarios) => {
        this.receivedMariosCount = receivedMarios.length;
        const allMarios = [...sentMarios.map(mario => ({ ...mario, isSender: true })), ...receivedMarios.map(mario => ({ ...mario, isSender: false }))];
        this.updateLastMariosData(allMarios);
      });
    });
  }

  private updateLastMariosData(allMarios: SentMario[]) {
    const sortedMarios = allMarios.sort((a, b) => {
      const dateA = a.sentDateTime instanceof Date ? a.sentDateTime.getTime() : new Date(a.sentDateTime).getTime();
      const dateB = b.sentDateTime instanceof Date ? b.sentDateTime.getTime() : new Date(b.sentDateTime).getTime();

      return dateB - dateA;
    });

    console.log(sortedMarios)

    this.lastMariosData = sortedMarios.slice(0,9)

  }

}
