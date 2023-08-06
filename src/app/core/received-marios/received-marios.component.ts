import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { InfoComponent } from "../info/info.component";
import { Router } from "@angular/router";
import {SentMarioService} from "../../services/sent-mario.service";
import { SentMario } from "../../interfaces/sent-mario";
import {InfoMariosComponent} from "../info-marios/info-marios.component";

@Component({
  selector: 'app-received-marios',
  templateUrl: './received-marios.component.html',
  styleUrls: ['./received-marios.component.css']
})
export class ReceivedMariosComponent implements OnInit {

  receivedMariosData: SentMario[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private sentMarioService: SentMarioService) { }

  ngOnInit() {
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

  onClick() {
    this.router.navigateByUrl("");
  }

  fetchData() {
    const recipientUuid = 'af6b2daf-e36c-43d5-82e5-b310033e49bc';

    this.sentMarioService.fetchReceivedMarios(recipientUuid);

    this.sentMarioService.receivedMarios.subscribe((receivedMarios) => {
      this.updateReceivedLastMariosData(receivedMarios);
    });
  }

  private updateReceivedLastMariosData(marios: SentMario[]) {
    this.receivedMariosData = marios.slice(0, 9);
  }

}
