import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FaucheService} from "../../service/fauche.service";
import {VenteBovin} from "../../models/vente/venteBovin";
import {Subject, takeUntil, tap} from "rxjs";
import {inThePast} from "../../validators/TimeValidators";

@Component({
  selector: 'app-vente-bovin-update',
  templateUrl: './vente-bovin-update.component.html',
  styleUrls: ['./vente-bovin-update.component.scss']
})
export class VenteBovinUpdateComponent implements OnInit, OnDestroy {

  public loading: boolean = false;

  public venteBovin!: VenteBovin;

  public formBovin: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly _venteService: VenteService,
              private readonly _route: ActivatedRoute,
              private readonly _faucheService: FaucheService,
              private readonly _router: Router) {

    this.formBovin = new FormGroup({
      numeroIdentification: new FormControl('',Validators.required),
      qtt: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('',[Validators.required, inThePast()]),
      prixCoutant: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('',[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this._venteService.getOneVenteBovin(this._route.snapshot.params['param']).subscribe(
      value => {
        takeUntil(this.destroyed$)
        this.venteBovin = value;
        this.load();
        this.loading = false
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit() {
    if (this.formBovin.valid)
      this._venteService.updateVenteBovin(this.venteBovin.id, this.formBovin.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vente modifiée")
          this._router.navigateByUrl('vente/all')
        })
      ).subscribe()
  }

  load() {
    this.formBovin = new FormGroup({
      numeroIdentification: new FormControl(this.venteBovin.bovin,Validators.required),
      qtt: new FormControl(this.venteBovin.quantite,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this.venteBovin.dateDeVente,[Validators.required, inThePast()]),
      prixCoutant: new FormControl(this.venteBovin.prixCoutant,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this.venteBovin.prixRevente,[Validators.min(0),Validators.required,Validators.pattern(/[0-9]+$/)]),
    })
  }
}
