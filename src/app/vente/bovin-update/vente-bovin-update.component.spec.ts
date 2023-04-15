import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteBovinUpdateComponent } from './vente-bovin-update.component';

describe('VenteBovinUpdateComponent', () => {
  let component: VenteBovinUpdateComponent;
  let fixture: ComponentFixture<VenteBovinUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteBovinUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteBovinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
