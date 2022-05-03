import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryFieldComponent } from './dictionary-field.component';

describe('DictionaryFieldComponent', () => {
  let component: DictionaryFieldComponent;
  let fixture: ComponentFixture<DictionaryFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
