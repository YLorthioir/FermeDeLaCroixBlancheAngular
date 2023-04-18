import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, map, Observable, startWith, Subject, takeUntil, tap} from "rxjs";
import {Bovin} from "../../models/bovin/bovin";
import {BovinService} from "../../service/bovin.service";
import {SanteService} from "../../service/sante.service";
import {Vaccination} from "../../models/sante/vaccination";
import {Vaccin} from "../../models/sante/vaccin";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})

export class VaccinationComponent implements OnInit, OnDestroy{

  public loading: boolean = false
  public bovin!: Bovin;
  public carnet!: Vaccination[];
  public vaccination!: Vaccination;
  public vaccin!:Vaccin;
  public bovins!: string[];
  public filteredOptions!: Observable<string[]>;
  public myControl = new FormControl('BE');
  public today: Date;

  private destroyed$ = new Subject();

  public form: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _santeService: SanteService,
              private readonly _router: Router) {
    this.form = new FormGroup({
      vaccination: new FormControl(),
      })
    this.form.get('vaccination')?.valueChanges.subscribe((nom) => {
      takeUntil(this.destroyed$),
      _santeService.getVaccin(nom.split(' (', 1)).subscribe((vaccin)=>{
        this.vaccin=vaccin;
        this.vaccination = this.carnet.find((vaccination) =>
          (vaccination.nom===(this.vaccin.nom+" ("+this.vaccin.dosage+")")))!
      })
    })
    this.today = new Date();
  }

  ngOnInit(): void {
    this._bovinService.getAllNI().subscribe(
      (bovins) => {
        takeUntil(this.destroyed$),
        this.bovins = bovins;
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
    this.loading=true;

    this._bovinService.getOne(option).subscribe((bovin) => {
      takeUntil(this.destroyed$),
      this.bovin = bovin;

      this._santeService.getCarnetVaccination(this.bovin.id).subscribe(
        (carnet) => {
          this.carnet = carnet.filter(vaccination => {
            return (vaccination.doseAdministrees !== vaccination.doseMax) &&
              ((vaccination.dateRappel === null) || (this.today<=vaccination.dateRappel))
          })

          this.loading=false;
        })
    })
  }

  OnSubmit(){
      this._santeService.vaccinate(this.bovin.id, this.vaccin.nom).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vaccination ajoutée")
          this._router.navigateByUrl('sante/vaccination')
        })
      ).subscribe()
  }
}
