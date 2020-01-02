import { Injectable } from '@angular/core';


const getWindow = () => window;

@Injectable({ providedIn: 'root' })
export class StorageService {
  private seed = '__PLINIOKE__';
  private storage = getWindow().localStorage;

  public get<T>(key: string) {
    return JSON.parse(this.storage.getItem(this.seed + key)) as T;
  }

  public save(key: string, value: object) {
    const strValue = JSON.stringify(value);
    this.storage.setItem(this.seed + key, strValue);
  }
}
