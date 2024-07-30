import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanhirapuzhaComponent } from './kanhirapuzha.component';

describe('KanhirapuzhaComponent', () => {
  let component: KanhirapuzhaComponent;
  let fixture: ComponentFixture<KanhirapuzhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanhirapuzhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanhirapuzhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
