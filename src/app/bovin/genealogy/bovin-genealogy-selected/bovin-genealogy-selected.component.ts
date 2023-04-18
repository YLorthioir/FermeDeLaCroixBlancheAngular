import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bovin} from "../../../models/bovin/bovin";
import {debounceTime, map, Observable, startWith, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {BovinService} from "../../../service/bovin.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bovin-genealogy-selected',
  templateUrl: './bovin-genealogy-selected.component.html',
  styleUrls: ['./bovin-genealogy-selected.component.scss']
})
export class BovinGenealogySelectedComponent implements OnInit, OnDestroy{

  public loading: boolean = false
  public bovin!: Bovin;
  public bovins!: string[];
  public filteredOptions!: Observable<string[]>;
  public selectedValue = new FormControl('');

  public myControl = new FormControl(this.route.snapshot.params['param']);

  public pere?: Bovin;
  public mere?: Bovin;
  public gpp?: Bovin;
  public gpm?: Bovin;
  public gmp?: Bovin;
  public gmm?: Bovin;
  public enfants: Bovin[] = [];
  public petitsEnfants: Bovin[] =[];

  private destroyed$ = new Subject();

  constructor(private readonly bovinService: BovinService,
              private readonly route: ActivatedRoute,
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

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  getBovin(numeroIdentification: string){

    this.loading=true;

    this.enfants=[];
    this.petitsEnfants=[];

    this.pere=undefined;
    this.mere=undefined;
    this.gpp=undefined;
    this.gpm=undefined
    this.gmp=undefined;
    this.gmm=undefined;

    this.bovinService.getOne(numeroIdentification).subscribe((bovin) => {
      takeUntil(this.destroyed$),
      this.bovin = bovin

      if(this.bovin.pereNI!= null && this.bovins.includes(this.bovin.pereNI)){
        this.bovinService.getOne(this.bovin.pereNI).subscribe((bovin)=>{
          this.pere=bovin
          if(this.pere.pereNI!= null){
            this.bovinService.getOne(this.pere.pereNI).subscribe((bovin)=>this.gpp=bovin);
          }
          if(this.bovin.mereNI!= null){
            this.bovinService.getOne(this.pere.mereNI).subscribe((bovin)=>this.gmp=bovin);
          }
        });
      }
      if(this.bovin.mereNI!= null && this.bovins.includes(this.bovin.mereNI)){
        this.bovinService.getOne(this.bovin.mereNI).subscribe((bovin)=>{
            this.mere=bovin
          if(this.mere.pereNI!= null){
            this.bovinService.getOne(this.mere.pereNI).subscribe((bovin)=>this.gpm=bovin);
          }
          if(this.mere.mereNI!= null){
            this.bovinService.getOne(this.mere.mereNI).subscribe((bovin)=>this.gmm=bovin);
          }
        })
      }

      this.bovinService.getEnfants(this.bovin.numeroInscription).subscribe((listeEnfant)=>{
        this.enfants=listeEnfant;
        this.enfants.sort((a, b) => {
            const aNI = a.numeroInscription.toUpperCase(); // ignore upper and lowercase
            const bNI = b.numeroInscription.toUpperCase(); // ignore upper and lowercase
            if (aNI < bNI) {
              return -1;
            }
            if (aNI > bNI) {
              return 1;
            }

            // names must be equal
            return 0;
          });
        this.enfants.forEach(enfants =>{
          this.bovinService.getEnfants(enfants.numeroInscription).subscribe((listePetitsEnfants)=>{
              listePetitsEnfants.forEach(b=> {
                this.petitsEnfants.push(b);
                this.petitsEnfants.sort((a, b) => {
                  const aNI = a.numeroInscription.toUpperCase(); // ignore upper and lowercase
                  const bNI = b.numeroInscription.toUpperCase(); // ignore upper and lowercase
                  if (aNI < bNI) {
                    return -1;
                  }
                  if (aNI > bNI) {
                    return 1;
                  }

                  // names must be equal
                  return 0;
                });
              }
            )
          })
        })
      })
    })

    this.loading = false;
  }

  OnBovinSelected(option: string){
    this.enfants=[];
    this.petitsEnfants=[];
    this.router.navigateByUrl('bovin/genealogy/'+option);
    this.getBovin(option);
  }

  refresh(){
    this.getBovin(this.bovin.numeroInscription)
  }
}
