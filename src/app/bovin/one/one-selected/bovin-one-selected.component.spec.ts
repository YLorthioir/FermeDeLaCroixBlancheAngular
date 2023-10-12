import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinOneSelectedComponent } from './bovin-one-selected.component';

describe('OneSelectedComponent', () => {
  let component: BovinOneSelectedComponent;
  let fixture: ComponentFixture<BovinOneSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinOneSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinOneSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
