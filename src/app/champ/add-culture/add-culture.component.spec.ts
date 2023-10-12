import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCultureComponent } from './add-culture.component';

describe('NouvelleCultureComponent', () => {
  let component: AddCultureComponent;
  let fixture: ComponentFixture<AddCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCultureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
