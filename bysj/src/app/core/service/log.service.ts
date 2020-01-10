import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }
  public log(msg: any): void {
    console.log(msg);
  }
  public error(msg: string, obj = {}): void {
    console.error(msg, obj);
  }
}
