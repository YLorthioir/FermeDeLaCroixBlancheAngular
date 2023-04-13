import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Fauche} from "../../models/champ/fauche";
import {Champ} from "../../models/champ/champ";
import {Router} from "@angular/router";
import {ChampService} from "../../service/champ.service";
import {FaucheService} from "../../service/fauche.service";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-all-fauche',
  templateUrl: './all-fauche.component.html',
  styleUrls: ['./all-fauche.component.scss']
})
export class AllFaucheComponent implements OnInit{

  displayedColumnsChamps: string[] = ['annee', 'type', 'fauche1', 'fauche1rendement', 'fauche2', 'fauche2rendement', 'fauche3', 'fauche3rendement', 'fauche4', 'fauche4rendement', 'modifier'];
  displayedColumnsAnnees: string[] = ['champ', 'type', 'fauche1', 'fauche1rendement', 'fauche2', 'fauche2rendement', 'fauche3', 'fauche3rendement', 'fauche4', 'fauche4rendement', 'modifier'];

  private _loading: boolean = false;

  private _champs!: Champ[];
  private _annees!: number[];

  private _fauchesChamp!: Fauche[];
  private _fauchesAnnee!: Fauche[];

  private _selectedValue = new FormControl('');
  private _champ = new FormControl('');
  private _annee = new FormControl(0);

  dataSourceChamp = new MatTableDataSource(this._fauchesChamp);
  dataSourceAnnee = new MatTableDataSource(this._fauchesAnnee);

  constructor(private readonly _champService: ChampService,
              private readonly _faucheService: FaucheService,
              private readonly _router: Router,
              private _liveAnnouncer: LiveAnnouncer) {
    this._champ?.valueChanges.subscribe((champ) => {
      this._faucheService.getAllFaucheChamp(champ!).subscribe( (fauche)=>{
        this._fauchesChamp=fauche;
        this.dataSourceChamp = new MatTableDataSource(this._fauchesChamp);
      })
    })
    this._annee?.valueChanges.subscribe((annee) => {
      this._faucheService.getAllFaucheAnnee(annee!).subscribe( (fauche)=>{
        this._fauchesAnnee=fauche;
        this.dataSourceAnnee = new MatTableDataSource(this._fauchesAnnee);
      })
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSourceAnnee.sort = sort;
    this.dataSourceChamp.sort = sort;
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

  get annees(): number[] {
    return this._annees;
  }
}
