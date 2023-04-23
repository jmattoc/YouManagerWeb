import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TableData} from '../md/md-table/md-table.component';
import {LegendItem, ChartType} from '../md/md-chart/md-chart.component';
import * as Chartist from 'chartist';
import {AuthService} from "@core/auth/auth.service";
import {UsuarioService} from "@shared/services/usuario.service";
import {ActivatedRoute} from "@angular/router";

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

  datosEdi: any = {};

  constructor(
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {
  }

  public tableData!: TableData;

  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function (data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {

    /*let valor: any = this.route.snapshot.paramMap.get('id');
    if (valor !== '0') {
      const decoded = atob(valor);
      const original = this.fromBinary(decoded);
      this.datosEdi = JSON.parse(original);
      this._authService.accessEdi = JSON.stringify(this.datosEdi.usuario);
      this._authService.accessToken = this.datosEdi.token;
      this._usuarioService.ListarOpcionPorIdUsuario().then((res:any) => {

        this._authService.accessOpcionesPorUsuario=JSON.stringify(res);
      });

    }*/

    this.tableData = {
      headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
      dataRows: [
        ['IC', 'Incidencia creados', '1500	', '53.23%'],
        ['IA', 'Incidencia Atendidos', '1250', '20.43%'],
        ['IR', 'Incidencia Rechazados', '256', '10.35%'],
        ['I', 'Incidencia Pendientes	', '80', '7.87%']
      ]
    };
    /* ----------==========     Daily Sales Chart initialization    ==========---------- */

    const dataDailySalesChart = {
      labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      series: [
        [30, 5, 15, 1, 0, 0, 0]
      ]
    };

    const optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
    };

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

   /* const dataCompletedTasksChart = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };*/
    const dataCompletedTasksChart = {
      labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      series: [
        [230, 350, 450, 220, 600, 240, 450, 250]
      ]
    };

    const optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
      // look
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
    };

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
      optionsCompletedTasksChart);

    this.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const dataWebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    const optionsWebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
    };
    const responsiveOptions: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];
    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

    this.startAnimationForBarChart(websiteViewsChart);

    // $('#worldMap').vectorMap({
    //   map: 'world_en',
    //   backgroundColor: 'transparent',
    //   borderColor: '#818181',
    //   borderOpacity: 0.25,
    //   borderWidth: 1,
    //   color: '#b3b3b3',
    //   enableZoom: true,
    //   hoverColor: '#eee',
    //   hoverOpacity: null,
    //   normalizeFunction: 'linear',
    //   scaleColors: ['#b6d6ff', '#005ace'],
    //   selectedColor: '#c9dfaf',
    //   selectedRegions: null,
    //   showTooltip: true,
    //   onRegionClick: function (element: any, code: any, region: any) {
    //     var message = 'You clicked "'
    //       + region
    //       + '" which has the code: '
    //       + code.toUpperCase();
    //
    //     alert(message);
    //   }
    // });
  }

  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(() => {
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(() => {
          const $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(() => {
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          if (hover_count >= 20) {
            $(this).children('.card-header, .card-image').addClass('hinge animated');
          }
        });
      });
    }
  }
  fromBinary(binary: string) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const charCodes = new Uint16Array(bytes.buffer);
    let result = '';
    for (let i = 0; i < charCodes.length; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
  }
}
