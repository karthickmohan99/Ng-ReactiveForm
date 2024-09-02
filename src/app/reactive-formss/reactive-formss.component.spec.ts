import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormssComponent } from './reactive-formss.component';

describe('ReactiveFormssComponent', () => {
  let component: ReactiveFormssComponent;
  let fixture: ComponentFixture<ReactiveFormssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormssComponent]
    });
    fixture = TestBed.createComponent(ReactiveFormssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
