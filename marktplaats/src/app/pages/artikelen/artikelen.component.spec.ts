import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelenComponent } from './artikelen.component';

describe('ArtikelenComponent', () => {
  let component: ArtikelenComponent;
  let fixture: ComponentFixture<ArtikelenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtikelenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikelenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
