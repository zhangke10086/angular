import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {User} from '../../../login/entity/User';
import {Res} from '../../../login/entity/Res';
import {Role} from '../../../login/entity/Role';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import j from 'src/assets/json/city.json';
@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.less']
})
export class UsercenterComponent implements OnInit {

  constructor(private userService: UserService,
              private use: User,
              private message: NzMessageService,
              private modal: NzModalService) { }
  edit = false;
  confirmModal: NzModalRef;
  user = new User();
  role = new Array<Role>();
  nzOptions: any[] | null = null;
  cityData;
  areaData;
  options;
  loading = false;
  getUserInfo() {
    const userid = JSON.parse(localStorage.getItem('userinfo')).id;
    this.userService.getUserInfo(userid).then((res: Res) => {
      this.user = res.data;
      this.role = this.user.roleList;
    });
  }
  ngOnInit() {
    this.getUserInfo();
    this.nzOptions = j;
  }
  save() {
    this.loading = true;
    this.userService.updateUserInfo(this.user).then((res: Res) => {
      this.user = res.data;
      this.edit = false;
      this.loading = false;
    });
  }
  Edit() {
    if (this.user.province) {
      this.cityData = this.nzOptions.find(t => t.name === this.user.province).children;
    }
    if (this.user.city) {
      this.areaData = this.cityData.find(t => t.name === this.user.city).children;
    }
    this.edit = true;
  }
  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }
  onChange($event) {

  }
  cancle() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '',
      nzContent: '数据还未保存，确定要取消操作吗？',
      nzOnOk: () => {
        this.userService.getUserInfo(this.user.id).then((res: Res) => {
          this.user = res.data;
          this.edit = false;
        });
      }
    });
  }
  provinceChange(value: string): void {
    this.user.city = null;
    this.cityData = this.nzOptions.find(t => t.name === value).children;
  }
  cityChange(value: string): void {
    this.user.area = null;
    this.areaData = this.cityData.find( t => t.name === value).children;
  }
}
