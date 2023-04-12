import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFaucheComponent } from './all-fauche.component';

describe('AllFaucheComponent', () => {
  let component: AllFaucheComponent;
  let fixture: ComponentFixture<AllFaucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFaucheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
