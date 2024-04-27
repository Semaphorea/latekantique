import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngstr-identity',
  templateUrl: './identity.component.html'
})
export class IdentityComponent {
  https: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  verify() {
    // Check the server.js tab to see an example implementation
    this.https.post('/create-verification-session', {})
      .subscribe((session:any) => {
        this.document.location.href = session.url;
      });
  }
}