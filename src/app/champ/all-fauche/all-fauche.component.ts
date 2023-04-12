import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Fauche} from "../../models/champ/fauche";
import {Champ} from "../../models/champ/champ";
import {Router} from "@angular/router";
import {ChampService} from "../../service/champ.service";
import {FaucheService} from "../../service/fauche.service";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-all-fauche',
  templateUrl: './all-fauche.component.html',
  styleUrls: ['./all-fauche.component.css']
})
export class AllFaucheComponent implements OnInit{

  displayedColumns: string[] = ['annee', 'type', 'fauche1', 'fauche1rendement', 'fauche2', 'fauche2rendement', 'fauche3', 'fauche3rendement', 'fauche4', 'fauche4rendement', 'modifier'];

  private _loading: boolean = false;

  private _champs!: Champ[];
  private _annees!: number[];

  private _fauchesChamp!: Fauche[];
  private _fauchesAnnee!: Fauche[];

  private _selectedValue = new FormControl('');
  private _champ = new FormControl('');
  private _annee = new FormControl(0);

  constructor(private readonly _champService: ChampService,
              private readonly _faucheService: FaucheService,
              private readonly _router: Router) {
    this._champ?.valueChanges.subscribe((champ) => {
      this._faucheService.getAllFaucheChamp(champ!).subscribe( (fauche)=>{
        this._fauchesChamp=fauche;
      })
    })
    this._annee?.valueChanges.subscribe((annee) => {
      this._faucheService.getAllFaucheAnnee(annee!).subscribe( (fauche)=>{
        this._fauchesAnnee=fauche;
      })
    })
  }

  ngOnInit(): void {
    this._champService.getAll().subscribe(
      champs => {
        this._loading=true;
        this._champs=champs;
        this._faucheService.getAllAnnee().subscribe(
          annees =>{
            this._annees=annees;
            this._loading=false;
        })
      }
    )
  }

  onUpdate(id: number){
    this._router.navigateByUrl('champ/fauche/update/'+id);
  }


  //Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get selectedValue(): FormControl<string | null> {
    return this._selectedValue;
  }

  get champs(): Champ[] {
    return this._champs;
  }

  get champ(): FormControl<string | null> {
    return this._champ;
  }

  get annee(): FormControl<number | null> {
    return this._annee;
  }

  get fauchesChamp(): Fauche[] {
    return this._fauchesChamp;
  }

  get fauchesAnnee(): Fauche[] {
    return this._fauchesAnnee;
  }

  get annees(): number[] {
    return this._annees;
  }
}
