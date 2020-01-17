import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import {User} from './entity/User';
import {Res} from './entity/Res';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private http: HttpClient,
              private loginService: LoginService,
  ) {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.router.navigate(['/index/index']);
    }
  }
  options: string[] = [];
  validateForm: FormGroup;
  logon = false;
  LForm: FormGroup;
  login() {
    console.log(this.validateForm.value.username);
    console.log(this.validateForm.value.password);
    this.loginService.login(this.validateForm.value.username, this.validateForm.value.password).then((res: {code; msg; state; data; roleList; }) => {
      if (res.code === 1) {
        this.message.success(`欢迎` + res.data.name + `登录成功,请稍候...`);
        localStorage.setItem('username', res.data.name);
        console.log(res.data);
        localStorage.setItem('userinfo', JSON.stringify(res.data));
        localStorage.setItem('role', JSON.stringify(res.data.roleList));
        setTimeout(() => {
          this.router.navigate(['/index']);
        });
        localStorage.setItem('token', res.msg);
      } else {
        this.message.warning('用户名或密码错误');
      }
    }, err => {
      this.message.warning('登录失败');
    });
    // this.router.navigate(['/index/welcome']);
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.LForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      check: [false, [Validators.required]],
    });
  }
  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }

  check() {
    this.LForm.value.check = !this.LForm.value.check;
  }
  ok() {
    if (!this.LForm.value.check) {
      this.message.warning('请阅读并同意系统协议！');
    } else {
      if (this.LForm.value.username
        && this.LForm.value.password
        && this.LForm.value.name) {
        this.loginService.logon(this.LForm.value.username,
          this.LForm.value.password,
          this.LForm.value.name).then((res: Res)  => {
          if (res.state === 200) {
            this.message.success('注册成功！');
            setTimeout(() => { this.logon = false; }, 2000);
          } else if (res.state === 501) {
            this.message.warning('用户名已被注册！');
          } else if (res.state === 500) {
            this.message.error('注册失败！');
          }

        });
      }
    }

  }
  open() {
    this.logon = true;
  }
}
