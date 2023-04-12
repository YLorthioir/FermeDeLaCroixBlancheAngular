import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Grain} from "../../models/champ/grain";
import {GrainService} from "../../service/grain.service";

@Component({
  selector: 'app-extra-params-champ',
  templateUrl: './extra-params-champ.component.html',
  styleUrls: ['./extra-params-champ.component.scss']
})
export class ExtraParamsChampComponent implements OnInit{

  private _grains!: Grain[];
  private _grain!: Grain;
  private _nomGrain: string ="";

  private _formGrainId: FormGroup;
  private _formGrain: FormGroup;

  constructor(private readonly _grainService: GrainService,) {
    this._formGrainId= new FormGroup({
      grainId: new FormControl('')
    })
    this._formGrainId.get('grainId')?.valueChanges.subscribe((v) => {
      this._grainService.getOne(v).subscribe({
        next: (grain) => {
          this._grain = grain;
          this._formGrain = new FormGroup({
            nomGrain: new FormControl(this._grain.nomGrain, Validators.required)
          })
        }})
    })
    this._formGrain = new FormGroup({
      nomGrain: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.refreshGrain()
  }

  refreshGrain(){
    this._grainService.getAll().subscribe(value => {
      this._grains=value;
    })
  }

  enregistrerModifGrain(){
    this._grainService.update(this._grain.id, this._formGrain.value).subscribe((response: any) => {
      this.refreshGrain();
    });
  }

  enregistrerGrain(){
    this._grainService.add(this._nomGrain).subscribe((response: any) => {
      this.refreshGrain();
    });
  }

  // Encapsulation

  get grains(): Grain[] {
    return this._grains;
  }

  get grain(): Grain {
    return this._grain;
  }

  get nomGrain(): string {
    return this._nomGrain;
  }

  set nomGrain(value: string) {
    this._nomGrain = value;
  }

  get formGrainId(): FormGroup {
    return this._formGrainId;
  }

  get formGrain(): FormGroup {
    return this._formGrain;
  }
}
