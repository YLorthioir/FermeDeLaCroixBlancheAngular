import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Bovin} from "../../models/bovin/bovin";
import {BovinService} from "../../service/bovin.service";
import {SanteService} from "../../service/sante.service";
import {Vaccination} from "../../models/sante/vaccination";
import {Vaccin} from "../../models/sante/vaccin";

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})

export class VaccinationComponent implements OnInit{

  private _loading: boolean = false
  private _bovin!: Bovin;
  private _carnet!: Vaccination[];
  private _vaccination!: Vaccination;
  private _vaccin!:Vaccin;
  private _bovins!: string[];
  private _filteredOptions!: Observable<string[]>;
  private _myControl = new FormControl('BE');
  private _today: Date;

  private _form: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _santeService: SanteService) {
    this._form = new FormGroup({
      vaccination: new FormControl(),
      })
    this._form.get('vaccination')?.valueChanges.subscribe((nom) => {
      _santeService.getVaccin(nom.split(' (', 1)).subscribe((vaccin)=>{
        this._vaccin=vaccin;
        this._vaccination = this._carnet.find((vaccination) =>
          (vaccination.nom===(this._vaccin.nom+" ("+this._vaccin.dosage+")")))!
      })
    })
    this._today = new Date();
  }

  ngOnInit(): void {
    this._bovinService.getAll().subscribe(
      (bovin) => {
        this._bovins = bovin.map((b)=>b.numeroInscription);
        this._filteredOptions = this._myControl.valueChanges.pipe(
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
    this._loading=true;

    this._bovinService.getOne(option).subscribe((bovin) => {
      this._bovin = bovin;

      this._santeService.getCarnetVaccination(this._bovin.id).subscribe(
        (carnet) => {
          this._carnet = carnet.filter(vaccination => {
            return (vaccination.doseAdministrees !== vaccination.doseMax) &&
              ((vaccination.dateRappel === null) || (this._today<=vaccination.dateRappel))
          })

          this._loading=false;
        })
    })
  }

  OnSubmit(){
      this._santeService.vaccinate(this._bovin.id, this._vaccin.nom).subscribe();
  }

  get loading(): boolean {
    return this._loading;
  }

  get bovin(): Bovin {
    return this._bovin;
  }

  get carnet(): Vaccination[] {
    return this._carnet;
  }

  get vaccination(): Vaccination {
    return this._vaccination;
  }

  get vaccin(): Vaccin {
    return this._vaccin;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }

  get form(): FormGroup {
    return this._form;
  }
}
