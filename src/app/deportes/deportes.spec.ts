import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deportes } from './deportes';

describe('Deportes', () => {
  let component: Deportes;
  let fixture: ComponentFixture<Deportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deportes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
