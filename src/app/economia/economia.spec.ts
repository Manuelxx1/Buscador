import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Economia } from './economia';

describe('Economia', () => {
  let component: Economia;
  let fixture: ComponentFixture<Economia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Economia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Economia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
