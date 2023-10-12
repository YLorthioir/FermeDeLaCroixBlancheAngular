import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, map, Observable, startWith, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {BovinService} from "../../service/bovin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bovin-genealogy',
  templateUrl: './bovin-genealogy.component.html',
  styleUrls: ['./bovin-genealogy.component.scss']
})
export class BovinGenealogyComponent implements OnInit, OnDestroy{


  public loading: boolean = false
  public bovins!: string[];
  public filteredOptions!: Observable<string[]>;

  private destroyed$ = new Subject();

  public myControl = new FormControl('BE');

  constructor(private readonly _bovinService: BovinService, private readonly _router: Router) {
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
    this._router.navigateByUrl('bovin/genealogy/'+option);
  }

}
