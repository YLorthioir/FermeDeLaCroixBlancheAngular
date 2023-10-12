import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraParamsComponent } from './extra-params.component';

describe('ExtraParamsComponent', () => {
  let component: ExtraParamsComponent;
  let fixture: ComponentFixture<ExtraParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
