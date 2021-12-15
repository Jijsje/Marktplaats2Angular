import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelenToevoegenComponent } from './artikelen-toevoegen.component';

describe('ArtikelenToevoegenComponent', () => {
  let component: ArtikelenToevoegenComponent;
  let fixture: ComponentFixture<ArtikelenToevoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtikelenToevoegenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikelenToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
