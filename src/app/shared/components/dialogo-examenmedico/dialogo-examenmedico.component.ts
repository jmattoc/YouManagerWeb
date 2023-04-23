import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
export interface DialogData {
  titulo: string;
  mensaje: string;
}
@Component({
  selector: 'app-dialogo-examenmedico',
  templateUrl: './dialogo-examenmedico.component.html',
  styleUrls: ['./dialogo-examenmedico.component.css']
})
export class DialogoExamneMedicoComponent implements OnInit {
  fxDisponibilidadPostulante?: string;
  datosBasicosFormGroup!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogo: MatDialogRef<DialogoExamneMedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  cerrarDialogo(): void {
    this.dialogo.close({ respuesta: false });
  }
  confirmado(): void {
    if (!this.datosBasicosFormGroup.valid)
      return;
    this.dialogo.close({ respuesta: true, txtComentario: this.datosBasicosFormGroup.controls["mytxtComentario"].value });
  }

  ngOnInit() {
    this.datosBasicosFormGroup = this._formBuilder.group({
      mytxtComentario: ['', [Validators.required]]
    });
  }


}
