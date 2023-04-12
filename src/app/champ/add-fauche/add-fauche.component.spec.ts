import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaucheComponent } from './add-fauche.component';

describe('AddFaucheComponent', () => {
  let component: AddFaucheComponent;
  let fixture: ComponentFixture<AddFaucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFaucheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
