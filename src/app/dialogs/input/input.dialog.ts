import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './input.dialog.html',
  styleUrls: [ './input.dialog.scss' ],
})
export class InputDialog {
  action: Subject<string> = new Subject();
  title = '';
  body = '';
  placeholder = '';
  yesButton = 'Sim';
  noButton = 'Não';
  inputText: string;

  constructor(public modalRef: MDBModalRef) {}

  onYesClick() {
    this.action.next(this.inputText);
    this.modalRef.hide();
  }

  onNoClick() {
    this.action.next(null);
    this.modalRef.hide();
  }
}
