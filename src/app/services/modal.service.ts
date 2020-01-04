import { MDBModalRef, MDBModalService, ModalOptions as MOptions } from 'angular-bootstrap-md';

import { Injectable, Type } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ModalService extends MDBModalService {
  show<T>(content: Type<T>, config?: ModalOptions): ModalRef<T> {
    return super.show(content, config) as ModalRef<T>;
  }
}

interface ModalRef<T> extends MDBModalRef {
  content: T;
}

export interface ModalOptions<T = {}> extends MOptions {
  data: Partial<T>;
}
