import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeenkaraComponent } from './meenkara.component';

describe('MeenkaraComponent', () => {
  let component: MeenkaraComponent;
  let fixture: ComponentFixture<MeenkaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeenkaraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeenkaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
