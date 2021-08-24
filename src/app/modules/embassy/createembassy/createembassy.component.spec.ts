import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateembassyComponent } from './createembassy.component';

describe('CreateembassyComponent', () => {
  let component: CreateembassyComponent;
  let fixture: ComponentFixture<CreateembassyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateembassyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateembassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
