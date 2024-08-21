import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputComponent } from './reusable-input.component';

describe('ReusableInputComponent', () => {
  let component: ReusableInputComponent;
  let fixture: ComponentFixture<ReusableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
