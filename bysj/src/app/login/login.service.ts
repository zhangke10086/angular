import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './entity/User';
import {Res} from './entity/Res';
import {UrlService} from '../core/service/url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = this.url.hostname + 'login';
  logoutUrl = this.url.hostname + 'logout';
  logonUrl = this.url.hostname + 'logon';
  withOutHeader = [];

  constructor(
    private http: HttpClient,
    private url: UrlService
  ) {
    this.withOutHeader.push(this.loginUrl);
  }

  // 用户登录,密码自动加密
  // 登录成功自动设置缓存
  login(username: string, pwd: string) {
    const body = new FormData();
    body.set('username', username);
    body.set('password', pwd);
    return new Promise((resolve, reject) => {
      this.http.post(this.loginUrl, body).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  logout() {
    return new Promise((resolve, reject) => {
      this.http.get(this.logoutUrl).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  logon(username: string, pwd: string, name: string, email: string) {
    const body = new FormData();
    body.set('username', username);
    body.set('password', pwd);
    body.set('name', name);
    body.set('email', email);
    return new Promise((resolve, reject) => {
      this.http.post(this.logonUrl, body).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  logtest(username, pwd) {
    //
    // this.http.post(this.loginUrl, body).subscribe(res => {
    // });
  }
  getUsers(username, pwd): Promise<User[]> {
    const body = new FormData();
    body.set('username', username);
    body.set('password', pwd);
    return new Promise(((resolve, reject) =>
      this.http.post(this.loginUrl, body)
        .toPromise().then((res: Res) => {
          if (res.state === 200) {
            resolve(res.data);
          }
      }, error => {
        reject(error);
      })));
  }

}
