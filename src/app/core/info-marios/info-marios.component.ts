import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SentMario} from "../../interfaces/sent-mario";


@Component({
  selector: 'app-info-marios',
  templateUrl: './info-marios.component.html',
  styleUrls: ['./info-marios.component.css']
})
export class InfoMariosComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoMariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mario: SentMario }
  ) { }

  onClickClose(): void {
    this.dialogRef.close();
  }
}
