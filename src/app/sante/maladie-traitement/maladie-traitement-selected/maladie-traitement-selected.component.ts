import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../../models/bovin/bovin";
import {debounceTime, map, Observable, startWith, Subject, takeUntil, tap} from "rxjs";
import {A} from "../../../models/sante/a";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BovinService} from "../../../service/bovin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SanteService} from "../../../service/sante.service";
import {Maladie} from "../../../models/sante/maladie";
import {Traitement} from "../../../models/sante/traitement";
import {inThePast} from "../../../validators/TimeValidators";

@Component({
  selector: 'app-maladie-traitement-selected',
  templateUrl: './maladie-traitement-selected.component.html',
  styleUrls: ['./maladie-traitement-selected.component.scss']
})
export class MaladieTraitementSelectedComponent implements OnInit{
  public loading: boolean = false
  public bovin!: Bovin;
  public bovins!: string[];
  public filteredOptions!: Observable<string[]>;
  public aCommeMaladie!: A[];
  public maladies!: Maladie[];
  public traitements!: Traitement[];
  public a!:A;

  public myControl = new FormControl('BE');

  public formInsert: FormGroup;
  public formUpdate: FormGroup;
  public formNom: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly _bovinService: BovinService,
              private readonly _route: ActivatedRoute,
              private readonly _santeService: SanteService,
              private readonly _router: Router) {

    this.getBovin(this._route.snapshot.params['param']);

    this.formInsert = new FormGroup({
      maladie: new FormControl('',Validators.required),
      traitement: new FormControl(''),
      annee: new FormControl('',[Validators.required, inThePast()]),
    })
    this.formNom = new FormGroup({
      id: new FormControl,
    })
    this.formUpdate = new FormGroup({
      maladie: new FormControl('',Validators.required),
      traitement: new FormControl(''),
      annee: new FormControl('',[Validators.required, inThePast()]),
    })
    this.formNom.get('id')?.valueChanges.subscribe((id) => {
      _santeService.getOneA(id).subscribe( (a)=>{
        this.a=a;
        this.refresh();
      })
    })

  }

  ngOnInit(): void {

    this._bovinService.getAllNI().subscribe(
      (bovin) => {
        this.bovins = bovin;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          debounceTime(500),
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){

    this.formNom.reset();
    this.formUpdate.reset();
    this._router.navigateByUrl('sante/maladie/'+option);
    this.getBovin(option);

  }

  getBovin(numeroInscription: string){
    this.loading = true;

    this._bovinService.getOne(numeroInscription).subscribe((bovin) => {
      this.bovin = bovin;

      this._santeService.getAllMaladie().subscribe(
        (maladies) => {
          this.maladies = maladies;

          this._santeService.getA(this.bovin.id).subscribe(
            (a) =>{
              this.aCommeMaladie = a;

              this._santeService.getAllTraitement().subscribe(
                (t) =>{
                  this.traitements = t;
                  this.loading=false;
                }
              );
            }
          );
        }
      );
    })
  }

  insertMaladie(){
    if(this.formInsert.valid)
      this._santeService.insertA(this.formInsert.value, this.bovin.id).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Maladie ajoutée")
          this.refresh();
        })
      ).subscribe({
        next: ()=>{},
        error: (err)=> {
          if(err.error.status === 'BAD_REQUEST')
            alert("Maladie déjà existante")
        }
      })
  }

  updateMaladie(){
    if(this.formUpdate.valid)
      this._santeService.updateA(this.formUpdate.value, this.a.id).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Maladie modifiée")
          this.refresh();
        })
      ).subscribe()
  }

  deleteA(id: number) {
    var val = confirm("Voulez-vous vraiment supprimer cet élément?");
    if (val == true) {
      this._santeService.deleteA(id).pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          alert("Maladie supprimée")
          this.refresh();
        })
      ).subscribe()
    }
  }

  refresh(){
    this.formUpdate = new FormGroup({
      maladie: new FormControl(this.a.maladieDTO.id,[Validators.required]),
      traitement: new FormControl(this.a.traitementDTO===null?null:this.a.traitementDTO.id),
      annee: new FormControl(this.a.anneeMaladie,[Validators.required, inThePast()]),
    })
  }
}
