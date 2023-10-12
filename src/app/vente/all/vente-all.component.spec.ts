import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteAllComponent } from './vente-all.component';

describe('VenteAllComponent', () => {
  let component: VenteAllComponent;
  let fixture: ComponentFixture<VenteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
