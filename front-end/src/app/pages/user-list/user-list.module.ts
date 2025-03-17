import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserListComponent } from './user-list.component';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
  ]
})
export class UserListModule { }
