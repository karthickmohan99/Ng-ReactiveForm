import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpModalComponent } from './sign-up-modal.component';

describe('SignUpModalComponent', () => {
  let component: SignUpModalComponent;
  let fixture: ComponentFixture<SignUpModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpModalComponent]
    });
    fixture = TestBed.createComponent(SignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
