import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliyarComponent } from './aliyar.component';

describe('AliyarComponent', () => {
  let component: AliyarComponent;
  let fixture: ComponentFixture<AliyarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AliyarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AliyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
