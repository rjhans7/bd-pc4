import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { LoadDataComponent } from './load-data/load-data.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { GenerateDataComponent } from './generate-data/generate-data.component';
import { NgxTweetModule } from "ngx-tweet";
@NgModule({
  declarations: [
    AppComponent,
    SearchEngineComponent,
    LoadDataComponent,
    HomeComponent,
    GenerateDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxTweetModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
