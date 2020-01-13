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
  selectedProvince = '';
  selectedCity = '';
  selectedArea = '';
  confirmModal: NzModalRef;
  user = new User();
  role = new Array<Role>();
  nzOptions: any[] | null = null;
  cityData;
  areaData;
  options;
  getUserInfo() {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.role = JSON.parse(localStorage.getItem('role'));
  }
  ngOnInit() {
    this.getUserInfo();
    this.nzOptions = j;
    if (this.user.province) {
      this.selectedProvince = this.user.province;
      this.cityData = this.nzOptions.find(t => t.name === this.user.province).children;
    }
    if (this.user.city) {
      this.selectedCity = this.user.city;
      this.areaData = this.cityData.find(t => t.name === this.user.city).children;
    }
    if (this.user.area) {
      this.selectedArea = this.user.area;
    }
    console.log(this.nzOptions);
  }
  save() {
    this.user.province = this.selectedProvince;
    this.user.city = this.selectedCity;
    this.user.area = this.selectedArea;
    this.userService.updateUserInfo(this.user).then((res: Res) => {
      this.edit = false;
    });
  }
  Edit() {
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
  cancle() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '',
      nzContent: '数据还未保存，确定要取消操作吗？',
      nzOnOk: () => {
        this.edit = false;
      }
    });
  }
  provinceChange(value: string): void {
    this.cityData = this.nzOptions.find(t => t.name === value).children;
  }
  cityChange(value: string): void {
    this.areaData = this.cityData.find( t => t.name === value).children;
  }
}
