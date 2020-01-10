import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
// @ts-ignore
import j from 'src/assets/config/menu.json';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { NzDropdownContextComponent, NzDropdownService } from 'ng-zorro-antd';
import {LogService} from '../../core/service/log.service';
import { InspurRouteReuse } from 'src/app/core/routereuse/routeReuse';
import { PlatformLocation } from '@angular/common';
import {filter, map, mergeMap} from 'rxjs/operators';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  @ViewChild('header', {static: false}) header: ElementRef;
  @ViewChild('layout', {static: false}) layout: ElementRef;
  menu: any = j;
  isCollapsed = false;
  showALL: boolean;
  tabIndex = 0;
  theme = 'dark';
  headerBg = '#141a1e';
  // tabBg = '#20262a';
  tabBg = '#4e4e4e';
  tabcardBg = '#4e4e4e';
  changeTheme = false;
  home ={
    url:'/index/welcome',
    title:'首页'
  }
  usercenter = {
    url:'/index/usercenter',
    title:'个人中心'
  }
  tabs: Array<any> = [];
  tabDropDown: NzDropdownContextComponent;
  username = localStorage.getItem('username');
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dropDownService: NzDropdownService,
              private location: PlatformLocation,
              ) {
    //锁死浏览器后退事件,防止出现empty缓冲页面
    location.onPopState(() => {
      router.navigate(['/index/empty']).then(res => {
        router.navigate(['/index/welcome']);
      });
    });
    InspurRouteReuse.deleteAll();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      const url = this.router.url;
      if (['/', '/login', '/index', '/index/empty'].indexOf(url) < 0) {
        const existMenu = this.tabs.find(info => url.includes(info.url));
        if (!existMenu) {// 如果不存在那么添加，
          if(existMenu!=undefined) {
            this.tabs.push(existMenu);
          }
        }
        this.tabIndex = this.tabs.findIndex(p => url.includes(p.url));
      }
    })

  }

  ngOnInit() {
    this.navigateTo(this.home);
  }
  navigateTo(data: any) {
    if(data === this.home && this.tabs.findIndex(p => data.url.includes(p.url))){
      this.router.navigate([data.url]);
    }
    console.log(this.tabs)
    if(this.tabs.includes(data)){
      this.router.navigate(['/index/empty']).then(() => {
        this.router.navigate([data.url]);
    })} else {
      this.tabs.push(data);
      this.router.navigate(['/index/empty']).then(res => {
        this.router.navigate([data.url])})
    }
    this.tabIndex = this.tabs.findIndex(p => data.url.includes(p.url));
  }

  // tab选中联动菜单选中
  menuSelected(menu: any) {
    try {
      return menu.url == this.tabs[this.tabIndex].url;
    } catch (e) {
    }
  }
  //tab中键,右键时触发
  onAuxClick(event: MouseEvent, tab: any) {
    //捕获中键
    if (event.button == 1 && event.which == 2) {
      this.closeUrl(tab);
    }
  }
  //动态创建tab右键菜单
  contextMenu($event: MouseEvent, template: TemplateRef<any>) {
    this.tabDropDown = this.dropDownService.create($event, template);
  }
  // 关闭选项标签
  closeUrl(tab: any) {
    // 当前关闭的是第几个路由
    const index = this.tabs.findIndex(t => t == tab);

    if (this.tabs.length == 1) {
      if (tab.url == '/index/welcome') {
        return;
      } else {
        this.tabs = [];
        this.router.navigate(['/index/welcome']).then(res => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        });
      }
    } else {
      this.tabs.splice(index, 1);
      // 删除复用
      // 如果当前删除的对象是当前选中的，那么需要跳转
      if (this.tabIndex === index) {
        // 显示上一个选中
        let menu = this.tabs[index - 1];
        if (!menu) {// 如果上一个没有下一个选中
          menu = this.tabs[index];
        }
        // 跳转路由
        this.router.navigate([menu.url]).then(res => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        });
      }
      InspurRouteReuse.deleteRouteSnapshot(tab.url);
    }
  }
  //tab右键菜单关闭
  dropDownClose() {
    if (this.tabDropDown) {
      this.tabDropDown.close();
    }
  }
  //刷新标签
  refresh(tab: any) {
    console.log(tab);
    this.router.navigate(['/index/empty']).then(res => {
      setTimeout(() => {
        InspurRouteReuse.deleteRouteSnapshot(tab.url);
          this.navigateTo(tab);
        }
      );
    });
  }
  //关闭所有，打开首页
  closeAllTab() {
    if (this.tabs.length == 1 && this.tabs[0].url == '/index/welcome') {
      return;
    }
    this.tabs = [];
    this.router.navigate(['/index/empty']).then(res => {
      setTimeout(() => {
          InspurRouteReuse.deleteAll();
          this.router.navigate(['/index/welcome']);
        }
      );
    });
  }
  logout(){
    delete localStorage['token'];
    this.router.navigate(['/login']);
    //   //TODO:如需要,向后台发起注销请求,清除后端保存的登录信息等
    //   window.open('/', '_self');
  }
  // 全屏切换
  fullScreen() {
    const element = document.documentElement;
    const requestMethod = element.requestFullscreen;
    if (requestMethod) {
      requestMethod.call(element);
      this.showALL = true;
    }
  }

  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      this.showALL = false;
    }
  }
  Height() {
    try {
      return this.layout.nativeElement.offsetHeight  - this.header.nativeElement.offsetHeight + 'px';
    } catch (e) {
    }
  }
  change(value) {
    if (value === true){
      this.theme = 'light';
      this.headerBg = '#3737f0';
      // this.tabBg = '#474cff';
      // this.tabcardBg = '#474cff';
    } else {
      this.theme = 'dark';
      this.headerBg = '#141a1e';
      // this.tabBg = '#474cff';
      // this.tabcardBg = '#474cff';
    }
  }
}
