import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Fauche} from "../../models/champ/fauche";
import {Champ} from "../../models/champ/champ";
import {Router} from "@angular/router";
import {ChampService} from "../../service/champ.service";
import {FaucheService} from "../../service/fauche.service";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-all-fauche',
  templateUrl: './all-fauche.component.html',
  styleUrls: ['./all-fauche.component.scss']
})
export class AllFaucheComponent implements OnInit, OnDestroy{

  displayedColumnsChamps: string[] = ['annee', 'type', 'fauche1', 'fauche1rendement', 'fauche2', 'fauche2rendement', 'fauche3', 'fauche3rendement', 'fauche4', 'fauche4rendement', 'modifier'];
  displayedColumnsAnnees: string[] = ['champ', 'type', 'fauche1', 'fauche1rendement', 'fauche2', 'fauche2rendement', 'fauche3', 'fauche3rendement', 'fauche4', 'fauche4rendement', 'modifier'];

  public loading: boolean = false;

  public champs$: Observable<Champ[]> = new Observable<Champ[]>;
  public annees!: number[];

  public fauchesChamp!: Fauche[];
  public fauchesAnnee!: Fauche[];

  public selectedValue = new FormControl('');
  public champ = new FormControl('');
  public annee = new FormControl(0);

  dataSourceChamp = new MatTableDataSource(this.fauchesChamp);
  dataSourceAnnee = new MatTableDataSource(this.fauchesAnnee);

  private destroyed$ = new Subject();

  constructor(private readonly champService: ChampService,
              private readonly faucheService: FaucheService,
              private readonly router: Router,
              public liveAnnouncer: LiveAnnouncer) {
    this.champ?.valueChanges.subscribe((champ) => {
      this.faucheService.getAllFaucheChamp(champ!).subscribe( (fauche)=>{
        this.fauchesChamp=fauche;
        this.dataSourceChamp = new MatTableDataSource(this.fauchesChamp);
      })
    })
    this.annee?.valueChanges.subscribe((annee) => {
      this.faucheService.getAllFaucheAnnee(annee!).subscribe( (fauche)=>{
        takeUntil(this.destroyed$),
        this.fauchesAnnee=fauche;
        this.dataSourceAnnee = new MatTableDataSource(this.fauchesAnnee);
      })
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSourceAnnee.sort = sort;
    this.dataSourceChamp.sort = sort;
  }

  ngOnInit(): void  {
    this.champs$=this.champService.getAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onUpdate(id: number){
    this.router.navigateByUrl('champ/fauche/update/'+id);
  }
}
