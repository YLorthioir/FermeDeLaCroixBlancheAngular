import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {VenteService} from "../../service/vente.service";
import {VenteBovin} from "../../models/vente/venteBovin";
import {VenteFauche} from "../../models/vente/venteFauche";

@Component({
  selector: 'app-vente-all',
  templateUrl: './vente-all.component.html',
  styleUrls: ['./vente-all.component.scss']
})
export class VenteAllComponent implements OnInit{

  private _loading: boolean = false;

  private _selectedValue = new FormControl('');

  private _venteBovin!: VenteBovin[];
  private _venteFauche!: VenteFauche[];

  displayedColumnsBovin: string[] = ['annee', 'date', 'numeroIdentification', 'quantite', 'prixRevente', 'prixCoutant', 'modifier', 'supprimer'];
  displayedColumnsFauche: string[] = ['annee', 'date', 'culture', 'quantite', 'prixRevente', 'prixCoutant', 'modifier', 'supprimer'];

  constructor(private readonly _venteService: VenteService) {}

  ngOnInit(): void {
    this._loading=true;
    this._venteService.getAllVenteBovin().subscribe(
      value => {
        this._venteBovin=value;
        this._venteService.getAllVenteFauche().subscribe(
          valueFauche => {
            this._venteFauche=valueFauche;
            this._loading=false
          }
        )
      }
    )
  }

  onUpdateFauche(id:number){

}

  onDeleteFauche(id:number){
    console.warn("suppresion")
    this._venteService.deleteVenteFauche(id).subscribe()
  }

  onUpdateBovin(id:number){

  }

  onDeleteBovin(id:number){
    console.warn("suppresion")
    this._venteService.deleteVenteBovin(id).subscribe()
  }

  // Encapsulation

  get loading(): boolean {
    return this._loading;
  }

  get selectedValue(): FormControl<string | null> {
    return this._selectedValue;
  }

  get venteBovin(): VenteBovin[] {
    return this._venteBovin;
  }

  get venteFauche(): VenteFauche[] {
    return this._venteFauche;
  }
}


