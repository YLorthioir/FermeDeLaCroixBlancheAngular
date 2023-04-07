import {Component, OnInit} from '@angular/core';
import {debounceTime, map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {BovinService} from "../../service/bovin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bovin-genealogy',
  templateUrl: './bovin-genealogy.component.html',
  styleUrls: ['./bovin-genealogy.component.scss']
})
export class BovinGenealogyComponent implements OnInit{


  private _loading: boolean = false
  private _bovins!: string[];
  private _filteredOptions!: Observable<string[]>;

  private _myControl = new FormControl('BE');

  constructor(private readonly _bovinService: BovinService, private readonly _router: Router) {
  }

  ngOnInit(): void {

    this._bovinService.getAllNI().subscribe(
      (bovins) => {
        this._bovins = bovins;
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
    this._router.navigateByUrl('bovin/genealogy/'+option);
  }

  //Encapsulation

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
