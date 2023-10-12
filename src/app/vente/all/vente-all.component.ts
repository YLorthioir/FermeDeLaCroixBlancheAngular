import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {VenteBovin} from "../../models/vente/venteBovin";
import {VenteFauche} from "../../models/vente/venteFauche";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vente-all',
  templateUrl: './vente-all.component.html',
  styleUrls: ['./vente-all.component.scss']
})
export class VenteAllComponent implements OnInit{

  public loading: boolean = false;

  public selectedValue = new FormControl('');

  public venteBovin!: VenteBovin[];
  public venteFauche!: VenteFauche[];

  displayedColumnsBovin: string[] = ['annee', 'date', 'numeroIdentification', 'quantite', 'prixRevente', 'prixCoutant', 'modifier', 'supprimer'];
  displayedColumnsFauche: string[] = ['annee', 'date', 'culture', 'quantite', 'prixRevente', 'prixCoutant', 'modifier', 'supprimer'];

  constructor(private readonly _venteService: VenteService, private readonly _router: Router) {}

  ngOnInit(): void {
    this.load()
  }

  load(){
    this.loading=true;
    this._venteService.getAllVenteBovin().subscribe(
      value => {
        this.venteBovin=value;
        this._venteService.getAllVenteFauche().subscribe(
          valueFauche => {
            this.venteFauche=valueFauche;
            this.loading=false
          }
        )
      }
    )
  }

  onUpdateFauche(id:number){
    this._router.navigateByUrl("vente/update/fauche/"+id)
  }



  onDeleteFauche(id:number){
    var val = confirm("Voulez-vous vraiment supprimer cet élément?");
    if( val == true ) {
      this._venteService.deleteVenteFauche(id).subscribe(
        ()=>this.load()
      )
    }
  }

  onUpdateBovin(id:number){
    this._router.navigateByUrl("vente/update/bovin/"+id)
  }

  onDeleteBovin(id:number){
    var val = confirm("Voulez-vous vraiment supprimer cet élément?");
    if( val == true ) {
      this._venteService.deleteVenteBovin(id).subscribe(
        ()=>this.load()
      )
    }
  }
}


