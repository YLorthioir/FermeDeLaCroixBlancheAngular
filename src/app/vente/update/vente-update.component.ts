import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {BovinService} from "../../service/bovin.service";
import {FaucheService} from "../../service/fauche.service";
import {ActivatedRoute} from "@angular/router";
import {VenteBovin} from "../../models/vente/venteBovin";
import {VenteFauche} from "../../models/vente/venteFauche";
import {Fauche} from "../../models/champ/fauche";

@Component({
  selector: 'app-vente-update',
  templateUrl: './vente-update.component.html',
  styleUrls: ['./vente-update.component.scss']
})
export class VenteUpdateComponent implements OnInit {

  private _loading: boolean = false;

  private _venteBovin?: VenteBovin;
  private _venteFauche?: VenteFauche;

  private _formBovin: FormGroup;
  private _formFauche: FormGroup;

  private _anneeFauche!: number[];

  private _fauchesAnnee!: Fauche[];

  constructor(private readonly _venteService: VenteService,
              private readonly _bovinService: BovinService,
              private readonly _route: ActivatedRoute,
              private readonly _faucheService: FaucheService) {

    this._formBovin = new FormGroup({
      numeroIdentification: new FormControl(this._venteBovin?.bovin, [Validators.required, Validators.minLength(10), Validators.pattern(/^(BE)[0-9]+$/)]),
      qtt: new FormControl(this._venteBovin?.quantite, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this._venteBovin?.dateDeVente, Validators.required),
      prixCoutant: new FormControl(this._venteBovin?.prixCoutant, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this._venteBovin?.prixRevente, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
    this._formFauche = new FormGroup({
      faucheId: new FormControl(this._venteFauche?.faucheDTO.id, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl(this._venteFauche?.quantite, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this._venteFauche?.dateDeVente, Validators.required),
      prixCoutant: new FormControl(this._venteFauche?.prixCoutant, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this._venteFauche?.prixRevente, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
  }

  ngOnInit(): void {
    this._loading = true;
    this._faucheService.getAllAnnee().subscribe(
      value => {
        this._anneeFauche = value;
        this._venteService.getOneVenteBovin(this._route.snapshot.params['param']).subscribe(
          venteBovin => {
            this._venteBovin = venteBovin;
            this._venteService.getOneVenteFauche(this._route.snapshot.params['param']).subscribe(
              value => {
                this._venteFauche = value;
                this.load()
                this._loading = false
              }
            )
          }
        )}
    )
  }

  onSubmit(type: string) {
    if (type === "bovin" && this._formBovin.valid)
      this._venteService.updateVenteBovin(this._venteBovin!.id, this._formBovin.value).subscribe()
    else if (type === "fauche" && this._formFauche.valid)
      this._venteService.updateVenteFauche(this._venteFauche!.id, this._formFauche.value).subscribe()
  }

  load(){
    this._formBovin = new FormGroup({
      numeroIdentification: new FormControl(this._venteBovin?.bovin, [Validators.required, Validators.minLength(10), Validators.pattern(/^(BE)[0-9]+$/)]),
      qtt: new FormControl(this._venteBovin?.quantite, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this._venteBovin?.dateDeVente, Validators.required),
      prixCoutant: new FormControl(this._venteBovin?.prixCoutant, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this._venteBovin?.prixRevente, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
    this._formFauche = new FormGroup({
      faucheId: new FormControl(this._venteFauche?.faucheDTO, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl(this._venteFauche?.quantite, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this._venteFauche?.dateDeVente, Validators.required),
      prixCoutant: new FormControl(this._venteFauche?.prixCoutant, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this._venteFauche?.prixRevente, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
  }

  // Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get formBovin(): FormGroup {
    return this._formBovin;
  }

  get formFauche(): FormGroup {
    return this._formFauche;
  }

  get venteBovin(): VenteBovin | undefined{
    return this._venteBovin;
  }

  get venteFauche(): VenteFauche | undefined{
    return this._venteFauche;
  }

  get fauchesAnnee(): Fauche[] {
    return this._fauchesAnnee;
  }
}
