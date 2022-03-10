import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomizeComponent } from './randomize/randomize.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { CancelAllComponent } from './cancel-all/cancel-all.component';
import { RecentlyUsedComponent } from './recently-used/recently-used.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RandomizeComponent,
    AddComponent,
    ListComponent,
    CancelAllComponent,
    RecentlyUsedComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
