import {Component, OnInit} from '@angular/core';
import {Bovin} from "../../models/bovin/bovin";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {BovinService} from "../../service/bovin.service";

@Component({
  selector: 'app-bovin-genealogy',
  templateUrl: './bovin-genealogy.component.html',
  styleUrls: ['./bovin-genealogy.component.scss']
})
export class BovinGenealogyComponent implements OnInit{

  private _loading: boolean = false
  private _bovin!: Bovin;
  private _bovins!: string[];
  private _filteredOptions!: Observable<string[]>;
  private _selectedValue = new FormControl('');

  private _myControl = new FormControl('BE');

  private _pere?: Bovin;
  private _mere?: Bovin;
  private _gpp?: Bovin;
  private _gpm?: Bovin;
  private _gmp?: Bovin;
  private _gmm?: Bovin;
  private _enfants!: Bovin[];
  private _petitsEnfants!: Bovin[];

  constructor(private readonly _bovinService: BovinService) {
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

    this._pere=undefined;
    this._mere=undefined;
    this._gpp=undefined;
    this._gpm=undefined
    this._gmp=undefined;
    this._gmm=undefined;

    this._bovinService.getOne(option).subscribe((bovin) => {
      this._bovin = bovin

      if(this._bovin.pereNI!=null){
        this._bovinService.getOne(this._bovin.pereNI).subscribe((bovin)=>{
          this._pere=bovin
          if(this._pere.pereNI!=null){
            this._bovinService.getOne(this._pere.pereNI).subscribe((bovin)=>this._gpp=bovin);
          }
          if(this._pere.mereNI!=null){
            this._bovinService.getOne(this._pere.mereNI).subscribe((bovin)=>this._gmp=bovin);
          }
        });
      }
      if(this._bovin.mereNI!=null){
        this._bovinService.getOne(this._bovin.mereNI).subscribe((bovin)=>{
          this._mere=bovin
          if(this._mere.pereNI!=null){
            this._bovinService.getOne(this._mere.pereNI).subscribe((bovin)=>this._gmp=bovin);
          }
          if(this._mere.mereNI!=null){
            this._bovinService.getOne(this._mere.mereNI).subscribe((bovin)=>this._gmm=bovin);
          }
        })
      }

      this._bovinService.getEnfants(this._bovin.numeroInscription).subscribe((listeEnfant)=>{
        this._enfants=listeEnfant;
        this._enfants.forEach(enfants =>{
          this._bovinService.getEnfants(enfants.numeroInscription).subscribe((listePetitsEnfants)=>{
            listePetitsEnfants.forEach(b=>this._petitsEnfants.push(b))
          })
        })
      })
    })
  }

  Refresh(){
    this._pere=undefined;
    this._mere=undefined;
    this._gpp=undefined;
    this._gpm=undefined
    this._gmp=undefined;
    this._gmm=undefined;

    this.OnBovinSelected(this._bovin.numeroInscription)
  }

  //Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get bovin(): Bovin {
    return this._bovin;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  get selectedValue(): FormControl<string | null> {
    return this._selectedValue;
  }

  get myControl(): FormControl<string | null> {
    return this._myControl;
  }

  get pere(): Bovin|undefined {
    return this._pere;
  }

  get mere(): Bovin|undefined{
    return this._mere;
  }

  get gpp(): Bovin|undefined {
    return this._gpp;
  }

  get gpm(): Bovin|undefined {
    return this._gpm;
  }

  get gmp(): Bovin|undefined {
    return this._gmp;
  }

  get gmm(): Bovin|undefined {
    return this._gmm;
  }

  get enfants(): Bovin[] {
    return this._enfants;
  }

  get petitsEnfants(): Bovin[] {
    return this._petitsEnfants;
  }
}
