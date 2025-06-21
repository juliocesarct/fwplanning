import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingRoomComponent } from './voting-room.component';

describe('VotingRoomComponent', () => {
  let component: VotingRoomComponent;
  let fixture: ComponentFixture<VotingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
