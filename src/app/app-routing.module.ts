import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddMariosComponent} from "./core/add-marios/add-marios.component";
import {InfoComponent} from "./core/info/info.component";
import {HomeComponent} from "./core/home/home.component";
import {ReceivedMariosComponent} from "./core/received-marios/received-marios.component";
import {SentMariosComponent} from "./core/sent-marios/sent-marios.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info', component: InfoComponent},
  { path: 'add-marios', component: AddMariosComponent},
  { path: 'received-marios', component: ReceivedMariosComponent},
  { path: 'sent-marios', component: SentMariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
