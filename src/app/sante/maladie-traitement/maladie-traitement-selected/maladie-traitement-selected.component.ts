import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../../models/bovin/bovin";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {A} from "../../../models/sante/a";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BovinService} from "../../../service/bovin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SanteService} from "../../../service/sante.service";
import {Maladie} from "../../../models/sante/maladie";
import {Traitement} from "../../../models/sante/traitement";

@Component({
  selector: 'app-maladie-traitement-selected',
  templateUrl: './maladie-traitement-selected.component.html',
  styleUrls: ['./maladie-traitement-selected.component.css']
})
export class MaladieTraitementSelectedComponent implements OnInit{
  private _loading: boolean = false
  private _bovin!: Bovin;
  private _bovins!: string[];
  private _filteredOptions!: Observable<string[]>;
  private _aCommeMaladie!: A[];
  private _maladies!: Maladie[];
  private _traitements!: Traitement[];
  private _a!:A;

  private _myControl = new FormControl('BE');

  private _formInsert: FormGroup;
  private _formUpdate: FormGroup;
  private _formNom: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _route: ActivatedRoute,
              private readonly _santeService: SanteService,
              private readonly _router: Router) {

    this.getBovin(this._route.snapshot.params['param']);

    this._formInsert = new FormGroup({
      maladie: new FormControl('',Validators.required),
      traitement: new FormControl(''),
      annee: new FormControl('',[Validators.required]),
    })
    this._formNom = new FormGroup({
      id: new FormControl,
    })
    this._formUpdate = new FormGroup({
      maladie: new FormControl('',Validators.required),
      traitement: new FormControl(''),
      annee: new FormControl('',[Validators.required]),
    })
    this._formNom.get('id')?.valueChanges.subscribe((id) => {
      _santeService.getOneA(id).subscribe( (a)=>{
        this._a=a;
        this.refresh();
      })
    })

  }

  ngOnInit(): void {

    this._bovinService.getAllNI().subscribe(
      (bovin) => {
        this._bovins = bovin;
        this._filteredOptions = this._myControl.valueChanges.pipe(
          debounceTime(500),
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this._bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){

    this._router.navigateByUrl('sante/maladie/'+option);
    this.getBovin(option);

  }

  getBovin(numeroInscription: string){
    this._loading = true;

    this._bovinService.getOne(numeroInscription).subscribe((bovin) => {
      this._bovin = bovin;

      this._santeService.getAllMaladie().subscribe(
        (maladies) => {
          this._maladies = maladies;

          this._santeService.getA(this._bovin.id).subscribe(
            (a) =>{
              this._aCommeMaladie = a;

              this._santeService.getAllTraitement().subscribe(
                (t) =>{
                  this._traitements = t;
                  this._loading=false;
                }
              );
            }
          );
        }
      );
    })
  }

  insertMaladie(){
    if(this._formInsert.valid)
      this._santeService.insertA(this._formInsert.value, this.bovin.id).subscribe();
  }

  updateMaladie(){
    if(this._formUpdate.valid)
      this._santeService.updateA(this._formUpdate, this._a.id).subscribe();
  }

  deleteA(id: number){
    this._santeService.deleteA(id).subscribe();
    this.refresh();
  }

  refresh(){
    this._formUpdate = new FormGroup({
      maladie: new FormControl(this._a.maladieDTO.id,Validators.required),
      traitement: new FormControl(this._a.traitementDTO.id),
      annee: new FormControl(this._a.anneeMaladie,[Validators.required]),
    })
  }

  //Encaspulation


  get loading(): boolean {
    return this._loading;
  }

  get bovin(): Bovin {
    return this._bovin;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get aCommeMaladie(): A[] {
    return this._aCommeMaladie;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }

  get maladies(): Maladie[] {
    return this._maladies;
  }

  get traitements(): Traitement[] {
    return this._traitements;
  }

  get formInsert(): FormGroup {
    return this._formInsert;
  }

  get formUpdate(): FormGroup {
    return this._formUpdate;
  }

  get formNom(): FormGroup {
    return this._formNom;
  }

  get a(): A {
    return this._a;
  }
}
