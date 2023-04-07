import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinGenealogySelectedComponent } from './bovin-genealogy-selected.component';

describe('BovinGenealogySelectedComponent', () => {
  let component: BovinGenealogySelectedComponent;
  let fixture: ComponentFixture<BovinGenealogySelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinGenealogySelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinGenealogySelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
