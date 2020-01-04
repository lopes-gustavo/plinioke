import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './confirm.dialog.html',
  styleUrls: [ './confirm.dialog.scss' ],
})
export class ConfirmDialog {
  action: Subject<boolean> = new Subject();
  title = '';
  body = '';
  yesButton = 'Sim';
  noButton = 'Não';

  constructor(public modalRef: MDBModalRef) {}

  onYesClick() {
    this.action.next(true);
    this.modalRef.hide();
  }

  onNoClick() {
    this.action.next(false);
    this.modalRef.hide();
  }
}
