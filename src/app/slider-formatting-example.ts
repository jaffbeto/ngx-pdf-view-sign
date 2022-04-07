import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import {
  TypedArray,
  DocumentInitParameters,
} from 'pdfjs-dist/types/src/display/api';
// import { getDocument } from 'pdfjs-dist/types/src/display/api';
// import { PDFViewer } from 'pdfjs-dist/types/web/pdf_viewer.component';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';

/**
 * @title Slider with custom thumb label formatting.
 */
@Component({
  selector: 'slider-formatting-example',
  templateUrl: 'slider-formatting-example.html',
  styleUrls: ['slider-formatting-example.scss'],
})
export class SliderFormattingExample implements OnInit {
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  zoom = 1;
  maxZoom = 3;
  minZoom = 0;
  maxScreen = 1;
  minScreen = 0.5;
  rotation = 0;
  currentPage = 1;
  zoomScale: 'page-width' | 'page-fit' | 'page-height' = 'page-width';

  disabledZoomOut = false;
  disabledZoomIn = false;
  disabledScreenFit = true;
  disabledScreenNoFit = false;
  disabledPageW = true;
  disabledPageH = false;

  @ViewChild('pdfViewer', { static: true }) pdfViewer: ElementRef;

  constructor() {}
  // public _PDFView: PdfViewerComponent,
  ngOnInit() {
    this.getPDF(this.src);
  }

  rotateView(type: string) {
    this.rotation = type === 'left' ? this.rotation - 90 : this.rotation + 90;
    console.log('rotation: ', this.rotation);
  }

  zoomView(type: string) {
    let _zoom = type === 'out' ? this.zoom - 0.1 : this.zoom + 0.1;
    this.zoom = Math.round((_zoom + Number.EPSILON) * 100) / 100;
    // zoom btn view control
    if (this.zoom > this.minZoom && this.zoom < this.maxZoom) {
      this.disabledZoomOut = false;
      this.disabledZoomIn = false;
    } else if (this.zoom === this.minZoom) {
      this.disabledZoomOut = true;
    } else if (this.zoom === this.maxZoom) {
      this.disabledZoomIn = true;
    }
    // screen btn view control
    if (this.zoom === this.minScreen) {
      this.disabledScreenNoFit = true;
      this.disabledScreenFit = false;
    } else if (this.zoom === this.maxScreen) {
      this.disabledScreenFit = true;
      this.disabledScreenNoFit = false;
    } else {
      this.disabledScreenFit = false;
      this.disabledScreenNoFit = false;
    }
    // page btn view control
    if (this.zoom !== 1) {
      this.disabledPageW = false;
      this.disabledPageH = false;
    }
    console.log('zoom: ', this.zoom);
  }

  screenView(type: string) {
    this.zoom = type === 'fit' ? this.maxScreen : this.minScreen;
    if (this.zoom === this.minScreen) {
      this.disabledScreenNoFit = true;
      this.disabledScreenFit = false;
    } else if (this.zoom === this.maxScreen) {
      this.disabledScreenFit = true;
      this.disabledScreenNoFit = false;
    } else {
      this.disabledScreenFit = false;
      this.disabledScreenNoFit = false;
    }
    console.log('screen: ', this.zoom);
  }

  pageView(type: 'page-width' | 'page-fit' | 'page-height') {
    this.zoomScale = type;
    if (this.zoomScale === 'page-width') {
      this.disabledPageW = true;
      this.disabledPageH = false;
    } else if (this.zoomScale === 'page-height') {
      this.disabledPageH = true;
      this.disabledPageW = false;
    } else {
      this.disabledPageW = false;
      this.disabledPageH = false;
    }
    this.zoom = 1;
    // console.log(this._PDFView.page);
  }

  async getPDF(
    path:
      | string
      | URL
      | TypedArray
      | pdfjsLib.PDFDataRangeTransport
      | DocumentInitParameters
  ) {
    // const pdfjs = await import('pdfjs-dist/build/pdf');
    // const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.js');
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    const loadingTask = pdfjsLib.getDocument(path);
    loadingTask.promise.then((pdf: any) => {
      console.log(pdf);
    });
    // pdfjsLib.getDocument(path).promise.then((_pdf) => {
    //   let total = _pdf.numPages;
    //   console.log(total);
    // });
  }

  // ================== TEST ===================

  // HighlightSelectedText() {
  //   let pageIndex = window.PDFViewerApplication.pdfViewer.currentPageNumber-1;
  //   let page = window.PDFViewerApplication.pdfViewer.getPageView(pageIndex);
  //   let pageElement = page.canvas.parentElement;
  //   let pageRect = page.canvas.getClientRects()[0];
  //   let selectionRects = window.getSelection().getRangeAt(0).getClientRects();
  //   let viewport = page.viewport;
  //   selectionRects = Array.from(selectionRects);
  //   let selected = selectionRects.forEach((r) => {
  //     let rect = viewport.convertToPdfPoint(r.left - pageRect.left, r.top - pageRect.top).concat(viewport.convertToPdfPoint(r.right - pageRect.left, r.bottom - pageRect.top));
  //     let bounds = viewport.convertToViewportRectangle(rect);
  //     let el = document.createElement('div');
  //     el.setAttribute('style', 'position: absolute; background-color: rgba(238, 170, 0, .2);' +
  //       'left:' + Math.min(bounds[0], bounds[2]) + 'px; top:' + Math.min(bounds[1], bounds[3]) + 'px;' +
  //       'width:' + Math.abs(bounds[0] - bounds[2]) + 'px; height:' + Math.abs(bounds[1] - bounds[3]) + 'px;');
  //     pageElement.appendChild(el);
  //   });
  // }

  // getSelectionCoords() {
  //   // let pdfViewer = window.appPdfViewer;
  //   let pdfViewer = getDocument(this.src);
  //   let pageIndex = pdfViewer.currentPageNumber - 1;
  //   let page = pdfViewer.getPageView(pageIndex);
  //   let pageRect = page.canvas.getClientRects()[0];
  //   let selectionRects = window.getSelection().getRangeAt(0).getClientRects();
  //   let viewport = page.viewport;
  //   let selectionRectsList = Object.values(selectionRects);
  //   let selected = selectionRectsList.map((r) => {
  //     return viewport.convertToPdfPoint(r.left - pageRect.x, r.top - pageRect.y).concat(
  //       viewport.convertToPdfPoint(r.right - pageRect.x, r.bottom - pageRect.y));
  //   });
  //   return {page: pageIndex, coords: selected};
  // }

  // showHighlight() {
  //   let selected = this.getSelectionCoords();
  //   let pageIndex = selected.page;
  //   let pdfViewer = window.appPdfViewer;
  //   let page = pdfViewer.getPageView(pageIndex);
  //   let pageElement = page.canvas.parentElement;
  //   let viewport = page.viewport;

  //   selected.coords.forEach((rect) => {

  //     // Individual Seletions...
  //     let x1 = Math.min(bounds[0], bounds[2]);
  //     let y1 = Math.min(bounds[1], bounds[3]);
  //     let width =  Math.abs(bounds[0] - bounds[2]);
  //     let hight = Math.abs(bounds[1] - bounds[3]);
  //     let el = createRectDiv([x1, y1, width, hight]);
  //     pageElement.appendChild(el);

  //   });

  // }

  // createRectDiv(boundBox: string[]){
  //   let randomColor = Math.floor(Math.random()*16777215).toString(16);
  //   console.log(randomColor);
  //   let el = document.createElement('div');
  //   el.setAttribute('class', 'hiDiv')
  //   el.setAttribute('style', 'position: absolute; background-color: #'+randomColor+'; opacity: 0.5;' +
  //   'left:' + boundBox[0] + 'px; top:' + boundBox[1] + 'px;' +
  //   'width:' + boundBox[2] + 'px; height:' + boundBox[3] + 'px;');
  //   return el;
  // }

  // @HostListener('window:mouseup', ['$event'])
  // onEvent(event: any) {
  //   let length = window.getSelection().toString().length;
  //   if(length > 0){
  //       this.showHighlight();
  //   }else{
  //       // Clear All ?!
  //   }
  //   console.log();
  // }
}
