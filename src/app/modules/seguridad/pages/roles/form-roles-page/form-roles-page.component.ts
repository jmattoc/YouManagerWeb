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
 
   constructor(private opcionService: OpcionService) {
     this.initialize();
   }
 
   initialize() {
    
   }
   listarOpciones(version:number){  
    if(localStorage.getItem("idRegistro")!="null"){ //EsEdicion
      this.opcionService.listarMisOpcionesxPerfilyVersion(parseInt(localStorage.getItem("idRegistro")),version).then((data: any[]) => {                    
        this.dataChange.next(data);  
      });      
    }else{
      this.opcionService.listarOpcionesxAppVersion(parseInt(localStorage.getItem("App")),version).then((data: any[]) => {            
        this.dataChange.next(data);  
      });
    }        
   }
   
   /** Add an item to to-do list */
   insertItem(parent: TodoItemNode, name: string) {
     if (parent.children) {
       parent.children.push({title: name} as TodoItemNode);
       this.dataChange.next(this.data);
     }
   }
 
   updateItem(node: TodoItemNode, name: string) {
     node.title = name;
     this.dataChange.next(this.data);
   }
 }


@Component({
  selector: 'app-form-roles-page',
  templateUrl: './form-roles-page.component.html',
  styleUrls:['./form-roles-page.component.css'],
  providers: [  ChecklistDatabase]
})
export class FormRolesComponent implements OnInit {
  @Input() objRegistro: any;
  @Output() onGuardar: EventEmitter<any> = new EventEmitter();  
  formulario: FormGroup;
  
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
  versiones: any [];
  versionDefault : any;
  constructor(private _database: ChecklistDatabase,
              public dialogo: MatDialog,
              private fb: FormBuilder,
              private aplicacionService: AplicacionService) {    
    this.treeFlattener = new MatTreeFlattener(this.transformer,this.getLevel,this.isExpandable,this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    // this.aplicacionService.listarVersiones(parseInt(localStorage.getItem("App"))).then((data: any[]) => {
    //   this.versionDefault = data[0].Version;
    //   this.versiones = data;      
    // });    
    
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.checkAll();
    });


  }
  checkAll(): void {
    this.checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
    for(let item of this.treeControl.dataNodes) {
      if((item as any).isSelected as boolean == true)
         this.checklistSelection.select(item);
    }
  } 
  async ngOnInit() {
    this.aplicacionService.listarVersiones(parseInt(localStorage.getItem("App"))).then((data: any[]) => {
      this.versionDefault = data[0].Version;
      this.versiones = data;      
      this._database.listarOpciones(this.versionDefault);      
    });    


    if(this.objRegistro){ //EsEdicion            
      this.formulario = this.fb.group({      
        nombre: [{ value: this.objRegistro.Nombre, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
        descripcion: [{ value: this.objRegistro.Descripcion, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        Peso: [{ value: this.objRegistro.Peso, disabled: false }, [Validators.required]]
      });
    }else{
      this.formulario = new FormGroup({      
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        Peso: new FormControl('', [Validators.required])      
      });
    }
  }
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.title === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: any, level: number) => {
       
    const existingNode = this.nestedNodeMap.get(node) as any;
    const flatNode =
      existingNode && existingNode.title === node.title ? existingNode : new TodoItemFlatNode();
    flatNode.title = node.title;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.id=node.id;
    flatNode.isboton=node.isboton;
    flatNode.parentId=node.parentId;
    flatNode.isSelected=node.isSelected;

    //console.log(node);

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

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
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
  addNewItem(node: TodoItemFlatNode) {
    
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
  async guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.dialogo.open(DialogoConfirmacionComponent, { maxWidth: '25vw', maxHeight: 'auto', height: 'auto', width: '25%', disableClose: true,
      data: { titulo: `Registro de Roles`, mensaje: `¿Está seguro que desea grabar?` }
    }).afterClosed().subscribe(async (Ok: Boolean) => {
        if (Ok) {
          var menuSelect : any[] = this.checklistSelection.selected;
          var botones : any[] =this.checklistSelection.selected.filter(a=>a.isboton).map(x => { return (x as any).id })
          var opciones : number[] = menuSelect.map(x => { return (x as any).parentId });//tomamos todos los parenId, ya que son opciones
          menuSelect.filter(a=>!a.isboton).map(x => { opciones.push((x as any).id)  });//opciones de los botones    
          this.treeControl.dataNodes.filter(a=>opciones.includes((a as any).id)).map(x => { opciones.push((x as any).parentId) }); //lectura de modulos
          opciones =  opciones.filter((item, i, arr) => arr.findIndex((t) => t=== item) === i);
          
          let request: any = {
            Id : this.objRegistro ? this.objRegistro.Id : 0,
            nombre : this.formulario.value.nombre,
            descripcion : this.formulario.value.descripcion,
            Peso : this.formulario.value.Peso,
            listOpciones :  opciones,
            listAcciones : botones,
            idAplicacion : localStorage.getItem("App"),
            versionOpcion : this.versionDefault
          };          
          this.onGuardar.emit(request);
        }
      });
  }
  onVersionChange(tr: { value: any; }){    
    this.versionDefault=tr.value;
    this._database.listarOpciones(this.versionDefault);    
    this.checkAll();
  }
}