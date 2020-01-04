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
    const path = this.router.createUrlTree([ 'minhas-listas' ], { queryParams: { name: 'joao', ids: '1,2,3,4' } }).toString();
    const short = baseUrl + path;
    const params = { key, short };
    this.httpClient.get<UrlShortenerResponse>(this.shortenerApiUrl, { params }).pipe(
      map(response => {
        if (response.url.status === UrlShortenerResponseStatus.OK) {
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
    status: UrlShortenerResponseStatus
    fullLink?: string
    date?: string
    shortLink?: string
    title?: string
  };
}

enum UrlShortenerResponseStatus {
  LINK_ALREADY_SHORTENED = 1,
  NOT_A_LINK = 2,
  LINK_ALREADY_TAKEN = 3,
  INVALID_API_KEY = 4,
  LINK_CONTAINS_INVALID_CHARACTERS = 5,
  LINK_IS_FROM_BLOCKED_DOMAIN = 6,
  OK = 7
}


/*
 POST https://api.short.cm/links
 Accept: application/json
 Content-Type: application/json
 Cache-Control: no-cache
 Authorization: WnjurZPkulLpZskx

 {
 "originalURL": "https://plinioke.tk/minhas-listas",
 "domain": "share.plinioke.tk"
 }

 ###

 {
 "id": 246132275,
 "originalURL": "https://plinioke.tk/minhas-listas",
 "DomainId": 74911,
 "archived": false,
 "path": "cbPd4w",
 "redirectType": null,
 "createdAt": "2020-01-03T03:05:46.463Z",
 "OwnerId": 60164,
 "updatedAt": "2020-01-03T03:05:46.463Z",
 "secureShortURL": "https://share.plinioke.tk/cbPd4w",
 "shortURL": "https://share.plinioke.tk/cbPd4w",
 "duplicate": false
 }

 */
