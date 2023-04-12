import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCultureComponent } from './update-culture.component';

describe('UpdateCultureComponent', () => {
  let component: UpdateCultureComponent;
  let fixture: ComponentFixture<UpdateCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCultureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
