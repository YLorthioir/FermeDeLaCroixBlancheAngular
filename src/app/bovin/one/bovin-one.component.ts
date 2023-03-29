import {Component, OnInit} from '@angular/core';
import {BovinService} from "../../service/bovin.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Bovin} from "../../models/bovin/bovin";

@Component({
  selector: 'app-bovin-one',
  templateUrl: './bovin-one.component.html',
  styleUrls: ['./bovin-one.component.css']
})
export class BovinOneComponent implements OnInit{

  loading: boolean = false
  bovin!: Bovin;
  bovins!: string[];
  filteredOptions!: Observable<string[]>;

  myControl = new FormControl('');

  constructor(private readonly _bovinService: BovinService) {
    }

  ngOnInit(): void {

    this.loading = true;
    this._bovinService.getAll().subscribe({
      next: (bovin) => {
        this.bovins = bovin.map((b)=>b.numeroInscription);
        this.loading = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue= value.toLowerCase();
    console.log(this.myControl)

    return this.bovins.filter((bov) => bov.toLowerCase().includes(filterValue));
  }

  OnBovinSelected(option: string){
    this._bovinService.getOne(option).subscribe({
      next: (bovin) => {
        this.bovin = bovin
      }
    })
  }
}
