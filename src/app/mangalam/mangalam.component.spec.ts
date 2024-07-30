import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangalamComponent } from './mangalam.component';

describe('MangalamComponent', () => {
  let component: MangalamComponent;
  let fixture: ComponentFixture<MangalamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangalamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangalamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
