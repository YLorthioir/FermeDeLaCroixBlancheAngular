import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {FaucheService} from "../../service/fauche.service";
import {ActivatedRoute} from "@angular/router";
import {VenteFauche} from "../../models/vente/venteFauche";
import {Fauche} from "../../models/champ/fauche";

@Component({
  selector: 'app-vente-update',
  templateUrl: './vente-fauche-update.component.html',
  styleUrls: ['./vente-fauche-update.component.scss']
})
export class VenteFaucheUpdateComponent implements OnInit {

  private _loading: boolean = false;

  private _venteFauche!: VenteFauche;

  private _formFauche: FormGroup;

  private _fauchesAnnee!: Fauche[];

  constructor(private readonly _venteService: VenteService,
              private readonly _route: ActivatedRoute,
              private readonly _faucheService: FaucheService) {

    this._formFauche = new FormGroup({
      faucheId: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('', Validators.required),
      prixCoutant: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
  }

  ngOnInit(): void {
    this._loading = true;
    this._venteService.getOneVenteFauche(this._route.snapshot.params['param']).subscribe(
      value => {
        this._venteFauche = value;
        this.load()
        this._loading = false
      }
    )
  }

  onSubmit(type: string) {
  if(this.formFauche.valid)
      this._venteService.updateVenteFauche(this._venteFauche.id, this._formFauche.value).subscribe()
  }

  load(){
    this._formFauche = new FormGroup({
      faucheId: new FormControl(this._venteFauche.faucheDTO.id, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl(this._venteFauche.quantite, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this._venteFauche.dateDeVente, Validators.required),
      prixCoutant: new FormControl(this._venteFauche.prixCoutant, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this._venteFauche.prixRevente, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
  }

  // Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get formFauche(): FormGroup {
    return this._formFauche;
  }

  get venteFauche(): VenteFauche{
    return this._venteFauche;
  }

  get fauchesAnnee(): Fauche[] {
    return this._fauchesAnnee;
  }
}
