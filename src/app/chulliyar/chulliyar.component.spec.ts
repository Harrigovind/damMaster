import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChulliyarComponent } from './chulliyar.component';

describe('ChulliyarComponent', () => {
  let component: ChulliyarComponent;
  let fixture: ComponentFixture<ChulliyarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChulliyarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChulliyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
