import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {FaucheService} from "../../service/fauche.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VenteFauche} from "../../models/vente/venteFauche";
import {Subject, takeUntil, tap} from "rxjs";
import {inThePast} from "../../validators/TimeValidators";

@Component({
  selector: 'app-vente-update',
  templateUrl: './vente-fauche-update.component.html',
  styleUrls: ['./vente-fauche-update.component.scss']
})
export class VenteFaucheUpdateComponent implements OnInit, OnDestroy {

  public loading: boolean = false;

  public venteFauche!: VenteFauche;

  public formFauche: FormGroup;

  private destroyed$ = new Subject();

  constructor(private readonly _venteService: VenteService,
              private readonly _route: ActivatedRoute,
              private readonly _faucheService: FaucheService,
              private readonly _router: Router) {

    this.formFauche = new FormGroup({
      faucheId: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl('', [Validators.required, inThePast()]),
      prixCoutant: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl('', [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this._venteService.getOneVenteFauche(this._route.snapshot.params['param']).subscribe(
      value => {
        takeUntil(this.destroyed$)
        this.venteFauche = value;
        this.load()
        this.loading = false
      }
    )
  }


  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSubmit() {
  if(this.formFauche.valid)
      this._venteService.updateVenteFauche(this.venteFauche.id, this.formFauche.value).pipe(
        takeUntil(this.destroyed$),
        tap(()=>{
          alert("Vente modifiée")
          this._router.navigateByUrl('vente/all')
        })
      ).subscribe()
  }

  load(){
    this.formFauche = new FormGroup({
      faucheId: new FormControl(this.venteFauche.fauche.id, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      qtt: new FormControl(this.venteFauche.quantite, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      date: new FormControl(this.venteFauche.dateDeVente, [Validators.required, inThePast()]),
      prixCoutant: new FormControl(this.venteFauche.prixCoutant, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
      prixRevente: new FormControl(this.venteFauche.prixRevente, [Validators.min(0), Validators.required, Validators.pattern(/[0-9]+$/)]),
    })
  }
}
