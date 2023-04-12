import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFaucheComponent } from './update-fauche.component';

describe('UpdateFaucheComponent', () => {
  let component: UpdateFaucheComponent;
  let fixture: ComponentFixture<UpdateFaucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFaucheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
