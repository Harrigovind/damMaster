import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalampuzhaComponent } from './malampuzha.component';

describe('MalampuzhaComponent', () => {
  let component: MalampuzhaComponent;
  let fixture: ComponentFixture<MalampuzhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MalampuzhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MalampuzhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
