import { Component, Inject, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ListarbandejaobjtivovalorResponse } from '@core/models/reco.interface';
import { DialogConfirmarperiodoComponent } from '@shared/components/dialog-confirmarperiodo/dialog-confirmarperiodo.component';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';

export interface DialogData {
  titulo: string;
  mensaje: string;
  id: number;
}

@Component({
  selector: 'app-bandejvaca',
  templateUrl: './bandejvaca.component.html',
  styleUrls: ['./bandejvaca.component.css']
})
export class BandejvacaComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
  ) { }

  ngOnInit(): void {
  }

}
