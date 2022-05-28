import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsGuideComponent } from './installations-guide.component';

describe('InstallationsGuideComponent', () => {
  let component: InstallationsGuideComponent;
  let fixture: ComponentFixture<InstallationsGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationsGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
