import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {BovinService} from "../../service/bovin.service";
import {FaucheService} from "../../service/fauche.service";
import {Fauche} from "../../models/champ/fauche";
import {debounceTime, map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-add',
  templateUrl: './vente-add.component.html',
  styleUrls: ['./vente-add.component.scss']
})
export class VenteAddComponent implements OnInit{

  private _loading: boolean = false;

  private _selectedValue = new FormControl('');

  private _formBovin: FormGroup;
  private _formFauche: FormGroup;

  private _anneeFauche!: number[];
  private _annee = new FormControl(0);

  private _fauchesAnnee!: Fauche[];

  private _filteredOptions!: Observable<string[]>;

  private _myControl = new FormControl('BE',Validators.required);
  private _bovins!: string[];

  constructor(private readonly _venteService: VenteService,
              private readonly _bovinService: BovinService,
              private readonly _faucheService: FaucheService) {

    this._formBovin = new FormGroup({
      numeroIdentification: new FormControl(''),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
    this._formFauche = new FormGroup({
      faucheId: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
    this._annee?.valueChanges.subscribe((annee) => {
      this._faucheService.getAllFaucheAnnee(annee!).subscribe( (fauche)=>{
        this._fauchesAnnee=fauche;
      })
    })
  }

  ngOnInit(): void {
    this._loading = true;
    this._faucheService.getAllAnnee().subscribe(
      value => {
        this._anneeFauche = value;
        this._bovinService.getAllBovinsEngraissement().subscribe(
          (bovin) => {
            this._bovins = bovin;
            this._filteredOptions = this._myControl.valueChanges.pipe(
              debounceTime(500),
              startWith(''),
              map(value => this._filter(value || '')),
            );
            this._loading=false;
          }
        )
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this._bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    if(this._selectedValue.value==="bovin" && this._formBovin.valid)
      this._venteService.addVenteBovin(this._formBovin.value).subscribe()
    else if (this._selectedValue.value==="fauche" && this._formFauche.valid)
      this._venteService.addVenteFauche(this._formFauche.value).subscribe()
  }

  OnBovinSelected(option: string){

    this._formBovin = new FormGroup({
      numeroIdentification: new FormControl(option),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
  }

  // Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get selectedValue(): FormControl<string | null> {
    return this._selectedValue;
  }

  get anneeFauche(): number[] {
    return this._anneeFauche;
  }

  get fauchesAnnee(): Fauche[] {
    return this._fauchesAnnee;
  }

  get formBovin(): FormGroup {
    return this._formBovin;
  }

  get formFauche(): FormGroup {
    return this._formFauche;
  }

  get annee(): FormControl<number | null> {
    return this._annee;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }
}