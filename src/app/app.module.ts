import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { SliderFormattingExample } from './slider-formatting-example';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule

@NgModule({
  declarations: [SliderFormattingExample],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    PdfViewerModule, // <- Add PdfViewerModule to imports
  ],
  providers: [],
  bootstrap: [SliderFormattingExample],
})
export class AppModule {}
