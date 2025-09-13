import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPrices } from './crypto-prices';

describe('CryptoPrices', () => {
  let component: CryptoPrices;
  let fixture: ComponentFixture<CryptoPrices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoPrices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoPrices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
