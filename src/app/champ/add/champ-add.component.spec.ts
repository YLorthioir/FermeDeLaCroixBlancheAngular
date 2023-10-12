import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampAddComponent } from './champ-add.component';

describe('ChampAddComponent', () => {
  let component: ChampAddComponent;
  let fixture: ComponentFixture<ChampAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
