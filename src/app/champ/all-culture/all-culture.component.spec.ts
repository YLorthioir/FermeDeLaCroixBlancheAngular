import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCultureComponent } from './all-culture.component';

describe('AllCultureComponent', () => {
  let component: AllCultureComponent;
  let fixture: ComponentFixture<AllCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCultureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
