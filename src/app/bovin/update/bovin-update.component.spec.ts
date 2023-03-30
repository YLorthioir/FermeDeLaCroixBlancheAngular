import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinUpdateComponent } from './bovin-update.component';

describe('BovinUpdateComponent', () => {
  let component: BovinUpdateComponent;
  let fixture: ComponentFixture<BovinUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
