import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-marios',
  templateUrl: './add-marios.component.html',
  styleUrls: ['./add-marios.component.css']
})
export class AddMariosComponent implements OnInit {
  marioName: any;
  marioMarios: any;
  marioTheme: any;
  marioMessage: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.addMarios()
  }

  addMarios() {
    this.http.get('/api/add-mario').subscribe(data => console.log(data))
  }

  onClick() {
    this.router.navigateByUrl("");
  }

  onSubmit() {

  }
}

