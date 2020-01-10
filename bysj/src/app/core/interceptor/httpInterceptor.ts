import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginService} from '../../login/login.service';



@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  private withOutHeader: Array<any>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private message: NzMessageService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(authReq);
    } else {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', null)
      });
      return next.handle(req);
    }
  }

}
