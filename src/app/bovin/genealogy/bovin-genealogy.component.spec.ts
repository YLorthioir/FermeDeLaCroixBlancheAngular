import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinGenealogyComponent } from './bovin-genealogy.component';

describe('BovinGenealogyComponent', () => {
  let component: BovinGenealogyComponent;
  let fixture: ComponentFixture<BovinGenealogyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinGenealogyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinGenealogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
