import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladieTraitementComponent } from './maladie-traitement.component';

describe('MaladieTraitementComponent', () => {
  let component: MaladieTraitementComponent;
  let fixture: ComponentFixture<MaladieTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaladieTraitementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaladieTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
