import { Component, OnInit } from '@angular/core';

export interface DialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-dialog-confir-adj-ausencia',
  templateUrl: './dialog-confir-adj-ausencia.component.html',
  styleUrls: []
})
export class DialogConfirAdjAusenciaComponent implements OnInit {

  constructor(
   /* public dialogo: MatDialogRef<DialogConfirAdjAusenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData*/
  ) { }

  ngOnInit(): void {
  }

  cerrarDialogo(){

  }

}
