import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    this.configureNewVersionAvailableEvent();
  }

  private configureNewVersionAvailableEvent() {
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      this.swUpdate.activateUpdate().then(() => {
        document.location.reload();
        console.log('The app is updating right now');
      });
    });

    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

  }
}
