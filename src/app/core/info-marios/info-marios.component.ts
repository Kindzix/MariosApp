import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-info-marios',
  templateUrl: './info-marios.component.html',
  styleUrls: ['./info-marios.component.css']
})
export class InfoMariosComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.infoMario()
  }

  infoMario() {
    this.http.get('/api/marios').subscribe(data => console.log(data))
  }
}
