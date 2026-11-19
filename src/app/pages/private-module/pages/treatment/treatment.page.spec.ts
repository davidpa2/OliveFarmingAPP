import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatmentPage } from './treatment.page';

describe('TreatmentPage', () => {
  let component: TreatmentPage;
  let fixture: ComponentFixture<TreatmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TreatmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
