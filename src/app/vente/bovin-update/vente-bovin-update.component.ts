import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {ActivatedRoute} from "@angular/router";
import {FaucheService} from "../../service/fauche.service";
import {VenteBovin} from "../../models/vente/venteBovin";

@Component({
  selector: 'app-vente-bovin-update',
  templateUrl: './vente-bovin-update.component.html',
  styleUrls: ['./vente-bovin-update.component.scss']
})
export class VenteBovinUpdateComponent implements OnInit {

  private _loading: boolean = false;

  private _venteBovin!: VenteBovin;

  private _formBovin: FormGroup;

  constructor(private readonly _venteService: VenteService,
              private readonly _route: ActivatedRoute,
              private readonly _faucheService: FaucheService) {

    this._formBovin = new FormGroup({
      numeroIdentification: new FormControl('',Validators.required),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',Validators.required),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
  }

  ngOnInit(): void {
    this._loading = true;
    this._venteService.getOneVenteBovin(this._route.snapshot.params['param']).subscribe(
      value => {
        this._venteBovin = value;
        this.load();
        this._loading = false
      }
    )
  }

  onSubmit(type: string) {
    if (this.formBovin.valid)
      this._venteService.updateVenteBovin(this._venteBovin.id, this._formBovin.value).subscribe()
  }

  load() {
    this._formBovin = new FormGroup({
      numeroIdentification: new FormControl(this._venteBovin.bovin,Validators.required),
      qtt: new FormControl(this._venteBovin.quantite,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this._venteBovin.dateDeVente,Validators.required),
      prixCoutant: new FormControl(this._venteBovin.prixCoutant,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this._venteBovin.prixRevente,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
  }

  // Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get formBovin(): FormGroup {
    return this._formBovin;
  }

  get venteBovin(): VenteBovin | undefined {
    return this._venteBovin;
  }
}
