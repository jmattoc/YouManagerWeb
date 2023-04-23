import { Component, OnInit } from '@angular/core';
import { Horario } from '@core/models/adm/Horario';
import { ContraService } from '../../services/contra.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-horario',
  templateUrl: './lista-horario.component.html'
})
export class ListaHorarioComponent implements OnInit {
  // displayedColumns: string[] = ['nombre', 'Descripción', 'Fecha registro', 'Estado']; 
  displayedColumns: string[] = ['nombre','descripcion','fechaRegistro','estado']; 
  ELEMENT_DATA : Horario[];
  // formulario!: FormGroup;    

  constructor(private contratoService: ContraService,private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.contratoService.getListarHorario() 
    .subscribe(data =>{ 
      data.forEach(a=>a.dscEstado=a.activo ==true?"ACTIVO":"INACTIVO");
      this.ELEMENT_DATA = data;     
      });    
  }
  NuevoHorario(){
    this.snackBar.open('Tgestiona: Estamos construyendo la opción para usted', 'Ok', { duration: 5 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
  }

}
