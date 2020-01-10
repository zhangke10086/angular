import {Component, OnInit, ViewChild} from '@angular/core';
import { ENgxPrintComponent } from 'e-ngx-print';
import {NzMessageService} from 'ng-zorro-antd';
import {LogService} from '../../../core/service/log.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.less']
})
export class CarComponent implements OnInit {

  constructor(private message: NzMessageService,
              protected log: LogService) { }
  QRCode;
  qrdata;
  codeable = false;
  workcenterList = ['都说了，别扫我，你还扫', '都说了，别扫我，你还扫'];
  @ViewChild('qrPrint', { static: false }) qrPrintComponent: ENgxPrintComponent;
  ngOnInit() {
  }
  print() {
    this.qrdata = this.workcenterList;
    if (this.qrdata.length === 0) {
      this.message.warning('请选择要打印的数据', {
        nzDuration: 2000
      });
    } else {
      this.codeable = true;
    }
  }
  browserPrint() {
    this.codeable = false;
    this.qrPrintComponent.print();
  }
}
