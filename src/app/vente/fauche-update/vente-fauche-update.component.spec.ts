import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteFaucheUpdateComponent } from './vente-fauche-update.component';

describe('VenteUpdateComponent', () => {
  let component: VenteFaucheUpdateComponent;
  let fixture: ComponentFixture<VenteFaucheUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteFaucheUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteFaucheUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
