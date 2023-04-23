import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
export interface DialogData {
  titulo: string;
  mensaje: string;
}
@Component({
  selector: 'app-dialogo-rechazoentrevista',
  templateUrl: './dialogo-rechazoentrevista.component.html',
  styleUrls: ['./dialogo-rechazoentrevista.component.css']
})
export class DialogoRechazoEntrevistaComponent implements OnInit {
  datosBasicosFormGroup!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogo: MatDialogRef<DialogoRechazoEntrevistaComponent>,
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
