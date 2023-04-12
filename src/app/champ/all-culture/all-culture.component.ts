import {Component, OnInit, ViewChild} from '@angular/core';
import {Culture} from "../../models/champ/culture";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ChampService} from "../../service/champ.service";
import {MatSort, Sort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";
import {Champ} from "../../models/champ/champ";

@Component({
  selector: 'app-all-culture',
  templateUrl: './all-culture.component.html',
  styleUrls: ['./all-culture.component.css']
})
export class AllCultureComponent implements OnInit{

  displayedColumns: string[] = ['dateDebut', 'dateFin', 'type', 'dateEpandage', 'qttFumier', 'analysePDF','modifier'];
  private _cultures?: any;
  private _loading: boolean = false
  private _culture?: Culture;
  private _formNom: FormGroup;
  private _champs!: Champ[];

  constructor(private readonly _champService: ChampService,
              private _router: Router,
              private _liveAnnouncer: LiveAnnouncer) {
    this._formNom = new FormGroup({
      id: new FormControl,
    })
    this._formNom.get('id')?.valueChanges.subscribe((id) => {
      this.load(id);
      })
  }
  ngOnInit(): void {
    this._loading=true;
    this._champService.getAll().subscribe(
      champs =>{
        this._champs = champs;
        this._loading = false;
      }
    )
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  @ViewChild(MatSort) sort?: MatSort;
  load(id: number){
    this._loading = true;

    this._champService.getAllCulture(id).subscribe({
      next: (cultures) => {
        this._cultures = cultures;
        this._cultures.sort = this.sort;
        this._loading = false;
      }
    })
  }

  onUpdate(id: number){
    this._router.navigateByUrl('champ/culture/update/'+id);
  }

  // Encapsulation

  get cultures(): Culture[] {
    return this._cultures;
  }

  get loading(): boolean {
    return this._loading;
  }

  get culture(): Culture | undefined {
    return this._culture;
  }

  get champs(): Champ[] {
    return this._champs;
  }

  get formNom(): FormGroup {
    return this._formNom;
  }


}
