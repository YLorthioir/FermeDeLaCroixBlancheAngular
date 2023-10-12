import {Component, OnDestroy, OnInit} from "@angular/core";
import {Bovin} from "../../../models/bovin/bovin";
import {Vaccination} from "../../../models/sante/vaccination";
import {A} from "../../../models/sante/a";
import {debounceTime, map, Observable, startWith, Subject, takeUntil} from "rxjs";
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
export class BovinOneSelectedComponent implements OnInit, OnDestroy{

  public loading: boolean = false
  public bovin!: Bovin;
  public bovins!: string[];
  public carnet!: Vaccination[];
  public filteredOptions!: Observable<string[]>;
  public aCommeMaladie!: A[];
  public femelleReproduction!: FemelleReproduction;
  public bovinEngraissement!: BovinEngraissement;

  public myControl = new FormControl('BE');

  private destroyed$ = new Subject();

  constructor(private readonly bovinService: BovinService,
              private readonly route: ActivatedRoute,
              private readonly santeService: SanteService,
              private readonly router: Router) {

    this.getBovin(this.route.snapshot.params['param']);

  }

  ngOnInit(): void {

    this.bovinService.getAllNI().subscribe(
      (bovin) => {
        takeUntil(this.destroyed$),
        this.bovins = bovin;
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

  public _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){

    this.router.navigateByUrl('bovin/one/'+option);
    this.getBovin(option);

  }

  getBovin(numeroInscription: string){
    this.loading = true;

    this.bovinService.getOne(numeroInscription).subscribe((bovin) => {
      takeUntil(this.destroyed$),
      this.bovin = bovin;

      this.santeService.getCarnetVaccination(this.bovin.id).subscribe(
        (carnet) => {
          this.carnet = carnet;

          this.santeService.getA(this.bovin.id).subscribe(
            (a) =>{
              this.aCommeMaladie = a;

              this.bovinService.getInfosReproduction(this.bovin.id).subscribe(
                (f) =>{
                  this.femelleReproduction = f;

                  this.bovinService.getInfosEngraissement(this.bovin.id).subscribe(
                    (b) =>{
                      this.bovinEngraissement = b

                      this.loading=false;
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
}
