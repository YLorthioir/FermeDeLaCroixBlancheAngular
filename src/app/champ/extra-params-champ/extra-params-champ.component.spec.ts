import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraParamsChampComponent } from './extra-params-champ.component';

describe('ExtraParamsChampComponent', () => {
  let component: ExtraParamsChampComponent;
  let fixture: ComponentFixture<ExtraParamsChampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraParamsChampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraParamsChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
