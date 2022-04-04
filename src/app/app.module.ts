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
import { ColorSchemeComponent } from './color-scheme/color-scheme.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    RandomizeComponent,
    AddComponent,
    ListComponent,
    CancelAllComponent,
    RecentlyUsedComponent,
    ColorSchemeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
