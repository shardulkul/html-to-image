import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major + '.' + VERSION.minor + '.' + VERSION.patch;

  @ViewChild('theDiv')
  theDiv: ElementRef;
  private captureService: NgxCaptureService;

  constructor() {
    this.captureService = new NgxCaptureService();
  }

  exportToImage(event) {
    // this.exportUsingHtmlToImage();

    this.exportUsingNgxCapture();
  }

  exportUsingNgxCapture() {
    this.captureService
      .getImage(this.theDiv.nativeElement, true)
      .pipe(
        tap((imgBase64) => {
          console.log(imgBase64);
          let image = new Image();
          image.src = imgBase64;
          document.body.appendChild(image);
        })
      )
      .subscribe();
  }

  exportUsingHtmlToImage() {
    console.log('exporting image...');
    console.log(this.theDiv);

    htmlToImage
      .toPng(this.theDiv.nativeElement)
      .then((dataUrl) => {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }
}
