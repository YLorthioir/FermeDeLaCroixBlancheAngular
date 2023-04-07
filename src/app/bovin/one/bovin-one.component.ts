import {Component, OnInit} from '@angular/core';
import {BovinService} from "../../service/bovin.service";
import {FormControl} from "@angular/forms";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {SanteService} from "../../service/sante.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bovin-one',
  templateUrl: './bovin-one.component.html',
  styleUrls: ['./bovin-one.component.scss']
})
export class BovinOneComponent implements OnInit{

  private _loading: boolean = false
  private _bovins!: string[];
  private _filteredOptions!: Observable<string[]>;

  private _myControl = new FormControl('BE');

  constructor(private readonly _bovinService: BovinService,
              private readonly _santeService: SanteService,
              private readonly _router: Router) {
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

  }

  //Encaspulation


  get loading(): boolean {
    return this._loading;
  }

  get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }


  get myControl(): FormControl<string | null> {
    return this._myControl;
  }
}
