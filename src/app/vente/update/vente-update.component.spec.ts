import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteUpdateComponent } from './vente-update.component';

describe('VenteUpdateComponent', () => {
  let component: VenteUpdateComponent;
  let fixture: ComponentFixture<VenteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
