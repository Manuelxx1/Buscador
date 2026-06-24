import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookComments } from './facebook-comments';

describe('FacebookComments', () => {
  let component: FacebookComments;
  let fixture: ComponentFixture<FacebookComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
