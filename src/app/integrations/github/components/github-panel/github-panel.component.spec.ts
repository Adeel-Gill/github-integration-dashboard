import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubPanelComponent } from './github-panel.component';

describe('GithubPanelComponent', () => {
  let component: GithubPanelComponent;
  let fixture: ComponentFixture<GithubPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
