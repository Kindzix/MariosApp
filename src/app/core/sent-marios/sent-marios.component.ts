import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {SentMario} from "../../interfaces/sent-mario";
import {SentMarioService} from "../../services/sent-mario.service";
import {last} from "rxjs";
import {InfoMariosComponent} from "../info-marios/info-marios.component";

@Component({
  selector: 'app-sent-marios',
  templateUrl: './sent-marios.component.html',
  styleUrls: ['./sent-marios.component.css']
})
export class SentMariosComponent implements OnInit {

  sentMariosData: SentMario[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private sentMarioService: SentMarioService) { }
  ngOnInit() {
    this.fetchData();
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
    const senderUuid = '8885c1a9-3dfc-453d-bd37-0129d0f62473';

    this.sentMarioService.fetchSentMarios(senderUuid);

    this.sentMarioService.sentMarios.subscribe((sentMarios) => {
      this.updateSentLastMariosData(sentMarios);
    });

  }

  private updateSentLastMariosData(marios: SentMario[]) {
    this.sentMariosData = marios.slice(0, 9);
  }

}
