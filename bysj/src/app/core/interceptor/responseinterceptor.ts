import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Injectable} from '@angular/core';
@Injectable()
export class Responseinterceptor implements HttpInterceptor {

  constructor(
    private message: NzMessageService,
  ) {}

  // response拦截器
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(map(event => {
      if (event instanceof HttpResponse) {
        if (event && event.body && event.body.state === '50002') {
            localStorage.removeItem('token');
            this.message.warning('当前账号已在其他地点登陆，您已被迫下线！');
            setTimeout(() => {
              window.open('/', '_self'); }, 2500);
          }
        if (event && event.body && event.body.state === '50001') {
          localStorage.removeItem('token');
          this.message.warning('当前token已失效，请重新登陆！');
          setTimeout(() => {
            window.open('/', '_self'); }, 2500);
        }
        return event;
        }
      }
    ), catchError(err => {
      console.log('err:', err);
      throw new Error(err);
    }));
  }
}
