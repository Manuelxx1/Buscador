import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cultura } from './cultura';

describe('Cultura', () => {
  let component: Cultura;
  let fixture: ComponentFixture<Cultura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cultura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cultura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
