import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Culture} from "../../models/champ/culture";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ChampService} from "../../service/champ.service";
import {MatSort, Sort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";
import {Champ} from "../../models/champ/champ";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-all-culture',
  templateUrl: './all-culture.component.html',
  styleUrls: ['./all-culture.component.scss']
})
export class AllCultureComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['dateMiseEnCulture', 'dateDeFin', 'estTemporaire', 'dateDernierEpandage', 'qttFumier', 'analysePDF','modifier'];
  public cultures!: Culture[];
  public loading: boolean = false
  public culture?: Culture;
  public formNom: FormGroup;
  public champs$: Observable<Champ[]> = new Observable<Champ[]>;
  dataSource = new MatTableDataSource(this.cultures);

  private destroyed$ = new Subject();

  constructor(private readonly champService: ChampService,
              public router: Router,
              public liveAnnouncer: LiveAnnouncer) {
    this.formNom = new FormGroup({
      id: new FormControl,
    })
    this.formNom.get('id')?.valueChanges.subscribe((id) => {
      this.load(id);
      })
  }
  ngOnInit(): void  {
    this.champs$=this.champService.getAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  load(id: number){
    this.loading = true;

    this.champService.getAllCulture(id).subscribe({
      next: (cultures) => {
        takeUntil(this.destroyed$),
        this.cultures = cultures;
        this.dataSource = new MatTableDataSource(this.cultures);
        this.loading = false;
      }
    })
  }

  onUpdate(id: number){
    this.router.navigateByUrl('champ/culture/update/'+id);
  }
}
