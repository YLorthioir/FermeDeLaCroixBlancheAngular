import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampUpdateComponent } from './champ-update.component';

describe('ChampUpdateComponent', () => {
  let component: ChampUpdateComponent;
  let fixture: ComponentFixture<ChampUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
