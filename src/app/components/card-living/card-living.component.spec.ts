import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLivingComponent } from './card-living.component';

describe('CardLivingComponent', () => {
  let component: CardLivingComponent;
  let fixture: ComponentFixture<CardLivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
