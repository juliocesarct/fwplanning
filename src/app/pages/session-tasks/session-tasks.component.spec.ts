import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTasksComponent } from './session-tasks.component';

describe('SessionTasksComponent', () => {
  let component: SessionTasksComponent;
  let fixture: ComponentFixture<SessionTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
