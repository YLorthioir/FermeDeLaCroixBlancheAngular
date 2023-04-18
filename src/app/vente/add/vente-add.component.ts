import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {BovinService} from "../../service/bovin.service";
import {FaucheService} from "../../service/fauche.service";
import {Fauche} from "../../models/champ/fauche";
import {debounceTime, map, Observable, startWith, Subject, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './vente-add.component.html',
  styleUrls: ['./vente-add.component.scss']
})
export class VenteAddComponent implements OnInit, OnDestroy{

  public loading: boolean = false;

  public selectedValue = new FormControl('');

  public formBovin: FormGroup;
  public formFauche: FormGroup;

  public anneeFauche!: number[];
  public annee = new FormControl(0);

  public fauchesAnnee!: Fauche[];

  public filteredOptions!: Observable<string[]>;

  public myControl = new FormControl('BE',Validators.required);
  public bovins!: string[];

  private destroyed$ = new Subject();

  constructor(private readonly _venteService: VenteService,
              private readonly _bovinService: BovinService,
              private readonly _faucheService: FaucheService,
              private readonly _router: Router) {

    this.formBovin = new FormGroup({
      numeroIdentification: new FormControl(''),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
    this.formFauche = new FormGroup({
      faucheId: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
    this.annee?.valueChanges.subscribe((annee) => {
      this._faucheService.getAllFaucheAnnee(annee!).subscribe( (fauche)=>{
        this.fauchesAnnee=fauche;
      })
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this._faucheService.getAllAnnee().subscribe(
      value => {
        this.anneeFauche = value;
        this._bovinService.getAllBovinsEngraissement().subscribe(
          (bovin) => {
            this.bovins = bovin;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              debounceTime(500),
              startWith(''),
              map(value => this.filter(value || '')),
            );
            this.loading=false;
          }
        )
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  public filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    if(this.selectedValue.value==="bovin" && this.formBovin.valid)
      this._venteService.addVenteBovin(this.formBovin.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vente ajouté")
          this._router.navigateByUrl('vente/all')
        })
      ).subscribe()
    else if (this.selectedValue.value==="fauche" && this.formFauche.valid)
      this._venteService.addVenteFauche(this.formFauche.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vente ajouté")
          this._router.navigateByUrl('vente/all')
        })
      ).subscribe()
  }

  OnBovinSelected(option: string){

    this.formBovin = new FormGroup({
      numeroIdentification: new FormControl(option),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
  }
}
