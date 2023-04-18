import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Grain} from "../../models/champ/grain";
import {GrainService} from "../../service/grain.service";
import {Observable, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-extra-params-champ',
  templateUrl: './extra-params-champ.component.html',
  styleUrls: ['./extra-params-champ.component.scss']
})
export class ExtraParamsChampComponent implements OnInit, OnDestroy{

  public grains$: Observable<Grain[]> = new Observable<Grain[]>;
  public grain!: Grain;
  public nomGrain: string ="";

  public formGrainId: FormGroup;
  public formGrain: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly grainService: GrainService,) {
    this.formGrainId= new FormGroup({
      grainId: new FormControl('')
    })
    this.formGrainId.get('grainId')?.valueChanges.subscribe((v) => {
      this.grainService.getOne(v).subscribe({
        next: (grain) => {
          this.grain = grain;
          this.formGrain = new FormGroup({
            nomGrain: new FormControl(this.grain.nomGrain, Validators.required)
          })
        }})
    })
    this.formGrain = new FormGroup({
      nomGrain: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.refreshGrain()
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  refreshGrain(){
    this.grains$ = this.grainService.getAll()
  }

  enregistrerModifGrain(){
    this.grainService.update(this.grain.id, this.formGrain.value).pipe(
      takeUntil(this.destroyed$),
      tap(()=>{
        this.refreshGrain()
      })
    ).subscribe();
  }

  enregistrerGrain(){
    this.grainService.add(this.nomGrain).pipe(
      takeUntil(this.destroyed$),
      tap(()=>{
        this.refreshGrain()
      })
    ).subscribe();
  }
}
