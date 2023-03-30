import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinAddComponent } from './bovin-add.component';

describe('BovinAddComponent', () => {
  let component: BovinAddComponent;
  let fixture: ComponentFixture<BovinAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
