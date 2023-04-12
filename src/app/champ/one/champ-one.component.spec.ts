import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampOneComponent } from './champ-one.component';

describe('OneComponent', () => {
  let component: ChampOneComponent;
  let fixture: ComponentFixture<ChampOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
