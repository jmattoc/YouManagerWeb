import { Component, EventEmitter, Input, OnInit, Output, Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OpcionService } from '@modules/seguridad/services/opcion.service';
import { RolesDto } from '@core/models/seguridad/RolesDto';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { AplicacionService } from '@modules/seguridad/services/aplicacion.service';
import { ModuloDelSistemaComponent } from '../modulo-del-sistema/modulo-del-sistema.component';
import { StepTabService } from '@modules/contra/services/StepTabService';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  title: string;
}
/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  title: string;
  level: number;
  expandable: boolean;
  isboton : boolean;
}
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children ite|s and new items can be added under the category.
 */
 @Injectable()
 export class ChecklistDatabase {
   dataChange = new BehaviorSubject<TodoItemNode[]>([]);   
   get data(): TodoItemNode[] {
     return this.dataChange.value;
   }
 
   constructor(private opcionService: OpcionService,
               private aplicacionService: AplicacionService) {
     this.initialize();
   }
   initialize() {    
    
   }
   listarOpciones(idAplicacion:number,version:number){    
    this.opcionService.listarOpcionesxAppVersion(idAplicacion,version).then((data: any[]) => {                  
      this.dataChange.next(data);  
    });     
   }
   /** Add an item to to-do list */
   insertItem(parent: TodoItemNode, name: string) {    
    //  if (parent.children) {
       parent.children.push({title: name} as TodoItemNode);
       this.dataChange.next(this.data);
    //  }
   }
 
   updateItem(node: TodoItemNode, name: string) {
     node.title = name;
     this.dataChange.next(this.data);
   }
 }

@Component({
  selector: 'app-form-opcion-page',
  templateUrl: './form-opcion-page.component.html',
  styleUrls:['./form-opcion-page.component.css']
  ,
  providers: [  ChecklistDatabase]
})
export class FormOpcionComponent implements OnInit {  
  opcionOrder: any[] ;

  @Input() objRegistro: any;
  @Output() onGuardar: EventEmitter<any> = new EventEmitter();    
  versiones: any [];
  versionDefault : any;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;
  /** The new item's name */
  newItemName = '';
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  decryptedMessage : string;

  constructor(private _database: ChecklistDatabase,
              public dialogo: MatDialog,
              private fb: FormBuilder,
              private aplicacionService: AplicacionService,
              public dialog: MatDialog,
              private notificador: BootstrapNotifyBarService,
              public stepService: StepTabService,
              private objService:OpcionService) {         
  this.treeFlattener = new MatTreeFlattener(this.transformer,this.getLevel,this.isExpandable,this.getChildren);
  this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);

  this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;      
    });    
  }  
  drop(event: CdkDragDrop<string[]>) {
    
    moveItemInArray(this.opcionOrder, event.previousIndex, event.currentIndex);
    
  }
  changeTab(index: number){
    // if(index==0)
    //   this._database.listarOpciones(this.objRegistro,this.versionDefault);
    // else
     if(index==1){
      var menuSelect : any[] = this.checklistSelection.selected;
      console.log(menuSelect);
      if(menuSelect.length==0)
        this.listarOrdenamiento();
      else if(menuSelect.length==1)
        this.listarOrdenamiento(menuSelect[0].id);
      else 
      this.notificador.notifyDanger("Debe seleccionar solo 1  opción para ver sus subOpciones");
    }
    
  }
  guardarOrdenamiento(){
   let req: any[]=[];
   let ordenamiento:number=0;
   this.opcionOrder.map(x => { req.push({Id:x.Id,Orden:ordenamiento++})});
   
    this.objService.actualizarOrden(req).subscribe((data: any) => {
      if(data.tipoResultado==1){
        this.notificador.notifySuccess(data.mensaje);        
      }else{
        this.notificador.notifyWarning(data.mensaje);
      }   
    }); 
  }
  async ngOnInit() {    
    this.aplicacionService.listarVersiones(this.objRegistro).then((data: any[]) => {      
      this.versionDefault = data[0].Version;
      this.versiones = data;      
      this._database.listarOpciones(this.objRegistro,this.versionDefault);      
    });         
  } 
  onVersionChange(tr: { value: any; }){
    
    this.versionDefault=tr.value;
    this._database.listarOpciones(this.objRegistro,this.versionDefault);
    this.listarOrdenamiento();
  }
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.title === '';

  transformer = (node: any, level: number) => {
       
    const existingNode = this.nestedNodeMap.get(node) as any;
    const flatNode = existingNode && existingNode.title === node.title ? existingNode : new TodoItemFlatNode();
    flatNode.title = node.title;
    flatNode.level = level;
    flatNode.expandable = true;// !!node.children?.length;
    flatNode.id=node.id;
    flatNode.isboton=node.isboton;
    flatNode.parentId=node.parentId;
    flatNode.isSelected=node.isSelected;

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    
    
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  // /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    // const descendants = this.treeControl.getDescendants(node);
    // console.log(descendants);
    // this.checklistSelection.isSelected(node)
    //   ? this.checklistSelection.select(...descendants)
    //   : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    // descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {    
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewOption(node: TodoItemFlatNode) {        
    const parentNode = this.flatNodeMap.get(node);    
    this._database.insertItem(parentNode!, '');    
    this.treeControl.expand(node);
  }
  addNewAction(node: TodoItemFlatNode) {    
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    console.log(node);
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
  crearOpcion(){
    var menuSelect : any[] = this.checklistSelection.selected;
    
    let mensaje:string="";
    let _idPadre = null;
    let _stPadre = null;
    if(menuSelect.length==0)
       mensaje="Está seguro de no asociar la nueva opción a una opción padre?";
    else if(menuSelect.length==1){
      _idPadre=menuSelect[0].id;
      _stPadre=menuSelect[0].title;
      mensaje="Está seguro asociar la nueva opción a "+_stPadre+"?";
    }

    if(mensaje!=""){
          this.dialogo.open(DialogoConfirmacionComponent, { maxWidth: '25vw', maxHeight: 'auto', height: 'auto', width: '25%', disableClose: true,
            data: { titulo: `Registro de Opciones`, mensaje: mensaje }
          }).afterClosed().subscribe(async (Ok: Boolean) => {
              if (Ok) {                                                
                this.dialog.open(ModuloDelSistemaComponent  , {
                  maxWidth: '50vw',
                  maxHeight: '50vw',
                  height: 'auto',
                  width: '80%',
                  disableClose: false,
                  data: { version: this.versionDefault,idPadre:_idPadre, stPadre :_stPadre, id:null },
                });
                // this._database.listarOpciones(this.objRegistro,this.versionDefault);      
              }
          });
    }
    else
    this.notificador.notifyDanger("Debe seleccionar solo 1  opción");
  }
  EditarModulo(){
    var menuSelect : any[] = this.checklistSelection.selected;
    if(menuSelect.length==1){
      this.dialog.open(ModuloDelSistemaComponent  , {
        maxWidth: '50vw',
        maxHeight: '50vw',
        height: 'auto',
        width: '80%',
        disableClose: false,
        data: { version: this.versionDefault, id: menuSelect[0].id },
      });
      // this._database.listarOpciones(this.objRegistro,this.versionDefault);      
    }else{
      this.notificador.notifyDanger("Debe seleccionar 1  opción");
    }   
  }
  listarOrdenamiento(idPadre:number=0){
    if(idPadre==0){
      this.objService.listarModulos(parseInt(localStorage.getItem("App")),this.versionDefault).subscribe((data: any) => {
        this.opcionOrder = data;      
      });    
    }else{
      this.objService.listarxIdPadre(idPadre).subscribe((data: any) => {
        this.opcionOrder = data;      
      });    
    }
  }
}