import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinUpdateSelectedComponent } from './bovin-update-selected.component';

describe('BovinUpdateSelectedComponent', () => {
  let component: BovinUpdateSelectedComponent;
  let fixture: ComponentFixture<BovinUpdateSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinUpdateSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinUpdateSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
