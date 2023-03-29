import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinOneComponent } from './bovin-one.component';

describe('BovinOneComponent', () => {
  let component: BovinOneComponent;
  let fixture: ComponentFixture<BovinOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
