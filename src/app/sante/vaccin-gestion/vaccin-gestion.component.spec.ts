import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinGestionComponent } from './vaccin-gestion.component';

describe('VaccinGestionComponent', () => {
  let component: VaccinGestionComponent;
  let fixture: ComponentFixture<VaccinGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
