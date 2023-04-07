import {Component, OnInit} from "@angular/core";
import {Bovin} from "../../../models/bovin/bovin";
import {Vaccination} from "../../../models/sante/vaccination";
import {A} from "../../../models/sante/a";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {FemelleReproduction} from "../../../models/bovin/femelleReproduction";
import {BovinEngraissement} from "../../../models/bovin/bovinEngraissement";
import {FormControl} from "@angular/forms";
import {BovinService} from "../../../service/bovin.service";
import {SanteService} from "../../../service/sante.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-one-selected',
  templateUrl: './bovin-one-selected.component.html',
  styleUrls: ['./bovin-one-selected.component.scss']
})
export class BovinOneSelectedComponent implements OnInit{

  private _loading: boolean = false
  private _bovin!: Bovin;
  private _bovins!: string[];
  private _carnet!: Vaccination[];
  private _filteredOptions!: Observable<string[]>;
  private _aCommeMaladie!: A[];
  private _femelleReproduction!: FemelleReproduction;
  private _bovinEngraissement!: BovinEngraissement;

  private _myControl = new FormControl('BE');

  constructor(private readonly _bovinService: BovinService,
              private readonly _route: ActivatedRoute,
              private readonly _santeService: SanteService,
              private readonly _router: Router) {

    this.getBovin(this._route.snapshot.params['param']);

  }

  ngOnInit(): void {

    this._bovinService.getAllNI().subscribe(
      (bovin) => {
        this._bovins = bovin;
        this._filteredOptions = this._myControl.valueChanges.pipe(
          debounceTime(500),
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

    this._router.navigateByUrl('bovin/one/'+option);
    this.getBovin(option);

  }

  getBovin(numeroInscription: string){
    this._loading = true;

    this._bovinService.getOne(numeroInscription).subscribe((bovin) => {
      this._bovin = bovin;

      this._santeService.getCarnetVaccination(this._bovin.id).subscribe(
        (carnet) => {
          this._carnet = carnet;

          this._santeService.getA(this._bovin.id).subscribe(
            (a) =>{
              this._aCommeMaladie = a;

              this._bovinService.getInfosReproduction(this._bovin.id).subscribe(
                (f) =>{
                  this._femelleReproduction = f;

                  this._bovinService.getInfosEngraissement(this._bovin.id).subscribe(
                    (b) =>{
                      this._bovinEngraissement = b

                      this._loading=false;
                    }
                  );
                }
              );
            }
          );
        }
      );
    })
  }

  //Encaspulation


  get loading(): boolean {
    return this._loading;
  }

  get bovin(): Bovin {
    return this._bovin;
  }

  get carnet(): Vaccination[] {
    return this._carnet;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get aCommeMaladie(): A[] {
    return this._aCommeMaladie;
  }

  get femelleReproduction(): FemelleReproduction {
    return this._femelleReproduction;
  }

  get bovinEngraissement(): BovinEngraissement {
    return this._bovinEngraissement;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }

}
