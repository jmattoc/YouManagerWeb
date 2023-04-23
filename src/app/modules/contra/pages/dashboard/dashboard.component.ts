import {Component, OnInit} from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {
    var token = localStorage.getItem('tokenBi') || "";
    this.showReport(token);
  }


  showReport(accessToken: string) {

    // Embed URL
    // let embedReportId = "024596db-4215-4d02-8c95-fd2f421d563b";//TICKETS EDI
    // let embedReportGroup = "ab52eed0-6457-4b3d-940c-d46574f4d1fe"; //TICKETS EDI

    // let embedReportId = "853e9181-c834-48d4-9fde-f71beac449f4";
    // let embedReportGroup = "f175c2b4-39a3-4d42-b012-beb148ec8efe";
    let embedReportId = "36257b02-7f52-4664-b3ee-5f7c6c8c265b";
    let embedReportGroup = "954b4d72-e6e2-4569-9781-a672d2c0e7b6";

    let embedUrl = "https://app.powerbi.com/reportEmbed?reportId=" + embedReportId + "&groupId=" + embedReportGroup;//POWERBI.GROUP_ID;
    let config = {
      type: 'report',
      embedUrl: embedUrl,
      accessToken: accessToken,
      permissions: pbi.models.Permissions.Read,
      settings: {
        panes: {
          bookmarks: {
            visible: false
          },
          fields: {
            expanded: true
          },
          filters: {
            expanded: false,
            visible: false
          },
          pageNavigation: {
            visible: true
          },
          selection: {
            visible: true
          },
          syncSlicers: {
            visible: true
          },
          visualizations: {
            expanded: true
          }
        }
      }
      //,
      //filters: [basicFilter]
    };
    let reportContainer = <HTMLElement>document.getElementById('reportContainer');
    let powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory);

    let report = powerbi.embed(reportContainer, config);
    report.off("loaded");
    report.on("loaded", () => {
      
    });
    report.on("error", () => {
      //      this.getToken();
    });
  }
}

