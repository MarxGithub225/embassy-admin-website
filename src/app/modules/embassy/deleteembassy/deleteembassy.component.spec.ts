import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteembassyComponent } from './deleteembassy.component';

describe('DeleteembassyComponent', () => {
  let component: DeleteembassyComponent;
  let fixture: ComponentFixture<DeleteembassyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteembassyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteembassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
