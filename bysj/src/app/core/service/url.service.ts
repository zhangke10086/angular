import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }
  // public hostname = 'http://47.93.242.169:8082/';
  public hostname = 'http://localhost:8082/';
}
