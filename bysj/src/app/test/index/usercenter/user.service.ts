import { Injectable } from '@angular/core';
import {User} from '../../../login/entity/User';
import {HttpClient} from '@angular/common/http';
import {Res} from '../../../login/entity/Res';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from '../../../core/service/url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private user: User,
              private message: NzMessageService,
              private http: HttpClient,
              private url: UrlService) { }
  updateUserInfo(data: User) {
    const url = this.url.hostname + 'updateUserInfo';
    return new Promise(((resolve, reject) =>
      this.http.post(url, data).toPromise().then((res: Res) => {
        if (res.state === 200) {
          localStorage.setItem('userinfo', JSON.stringify(res.data));
          this.message.success('保存成功！');
          resolve(res);
        } else if (res.state === 500) {
          this.message.error('服务器异常');
        }
      }, error => {
        reject(error);
      })));
  }
  getProvince() {
    return this.http.get('/assets/json/city.json');
  }
}
