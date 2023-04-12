import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladieTraitementSelectedComponent } from './maladie-traitement-selected.component';

describe('MaladieTraitementSelectedComponent', () => {
  let component: MaladieTraitementSelectedComponent;
  let fixture: ComponentFixture<MaladieTraitementSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaladieTraitementSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaladieTraitementSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
