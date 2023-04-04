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
  styleUrls: ['./vaccination.component.css']
})

export class VaccinationComponent implements OnInit{

  loading: boolean = false
  bovin!: Bovin;
  carnet!: Vaccination[];
  vaccination!: Vaccination;
  vaccin!:Vaccin;
  bovins!: string[];
  filteredOptions!: Observable<string[]>;
  myControl = new FormControl('BE');
  today: Date;

  form: FormGroup;

  constructor(private readonly _bovinService: BovinService,
              private readonly _santeService: SanteService) {
    this.form = new FormGroup({
      vaccination: new FormControl(),
      })
    this.form.get('vaccination')?.valueChanges.subscribe((nom) => {
      _santeService.getVaccin(nom.split(' (', 1)).subscribe((vaccin)=>{
        this.vaccin=vaccin;
        this.vaccination = this.carnet.find((vaccination) => (vaccination.nom===(this.vaccin.nom+" ("+this.vaccin.dosage+")")))!
      })
    })
    this.today = new Date();
  }

  ngOnInit(): void {
    this._bovinService.getAll().subscribe(
      (bovin) => {
        this.bovins = bovin.map((b)=>b.numeroInscription);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){
    this.loading=true;

    this._bovinService.getOne(option).subscribe((bovin) => {
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
      this._santeService.vaccinate(this.bovin.id, this.vaccin.nom).subscribe();
  }
}
