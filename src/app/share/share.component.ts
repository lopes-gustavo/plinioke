import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: [ './share.component.scss' ]
})
export class ShareComponent implements OnInit {
  private shortenerApiKey = '8451342bcf3be6efc0ae7236e701ab8ee289f';
  private shortenerApiUrl = `https://share.plinioke.tk/api/api.php`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    const key = this.shortenerApiKey;
    const baseUrl = window.location.origin;
    const path = this.router.createUrlTree([ 'my-lists' ], { queryParams: { name: 'joao', ids: '1,2,3,4' } }).toString();
    const short = baseUrl + path;
    const params = { key, short };
    this.httpClient.get<UrlShortenerResponse>(this.shortenerApiUrl, { params }).pipe(
      map(response => {
        if (response.url.status === 7) {
          return response.url.shortLink;
        } else {
          throw new Error(response.url.status.toString());
        }
      })
    ).subscribe(response => console.log(response), error => console.error(error));
  }

}

interface UrlShortenerResponse {
  url: {
    status: number
    fullLink?: string
    date?: string
    shortLink?: string
    title?: string
  };
}
