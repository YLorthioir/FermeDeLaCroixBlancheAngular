import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../models/bovin/bovin";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {BovinService} from "../../service/bovin.service";

@Component({
  selector: 'app-bovin-genealogy',
  templateUrl: './bovin-genealogy.component.html',
  styleUrls: ['./bovin-genealogy.component.css']
})
export class BovinGenealogyComponent implements OnInit{

  loading: boolean = false
  bovin!: Bovin;
  bovins!: string[];
  filteredOptions!: Observable<string[]>;
  selectedValue = new FormControl('');

  myControl = new FormControl('BE');

  pere?: Bovin;
  mere?: Bovin;
  gpp?: Bovin;
  gpm?: Bovin;
  gmp?: Bovin;
  gmm?: Bovin;
  enfants!: Bovin[];
  petitsEnfants!: Bovin[];

  constructor(private readonly _bovinService: BovinService) {
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

    this.pere=undefined;
    this.mere=undefined;
    this.gpp=undefined;
    this.gpm=undefined
    this.gmp=undefined;
    this.gmm=undefined;

    this._bovinService.getOne(option).subscribe((bovin) => {
      this.bovin = bovin

      if(this.bovin.pereNI!=null){
        this._bovinService.getOne(this.bovin.pereNI).subscribe((bovin)=>{
          this.pere=bovin
          if(this.pere.pereNI!=null){
            this._bovinService.getOne(this.pere.pereNI).subscribe((bovin)=>this.gpp=bovin);
          }
          if(this.pere.mereNI!=null){
            this._bovinService.getOne(this.pere.mereNI).subscribe((bovin)=>this.gmp=bovin);
          }
        });
      }
      if(this.bovin.mereNI!=null){
        this._bovinService.getOne(this.bovin.mereNI).subscribe((bovin)=>{
          this.mere=bovin
          if(this.mere.pereNI!=null){
            this._bovinService.getOne(this.mere.pereNI).subscribe((bovin)=>this.gmp=bovin);
          }
          if(this.mere.mereNI!=null){
            this._bovinService.getOne(this.mere.mereNI).subscribe((bovin)=>this.gmm=bovin);
          }
        })
      }

      this._bovinService.getEnfants(this.bovin.numeroInscription).subscribe((listeEnfant)=>{
        this.enfants=listeEnfant;
        this.enfants.forEach(enfants =>{
          this._bovinService.getEnfants(enfants.numeroInscription).subscribe((listePetitsEnfants)=>{
            listePetitsEnfants.forEach(b=>this.petitsEnfants.push(b))
          })
        })
      })
    })
  }

  Refresh(){
    this.pere=undefined;
    this.mere=undefined;
    this.gpp=undefined;
    this.gpm=undefined
    this.gmp=undefined;
    this.gmm=undefined;

    this.OnBovinSelected(this.bovin.numeroInscription)
  }

}
