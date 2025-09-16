import { Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../services/github-integration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-github-status',
  standalone: false,
  templateUrl: './github-status.component.html',
  styleUrls: ['./github-status.component.scss']
})
export class GithubStatusComponent implements OnInit {
  connected = false;
  connectedAt?: string;
  user: any;

  constructor(
    private svc: GithubIntegrationService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadStatus();
  }

  loadStatus() {
    this.svc.getStatus().subscribe({
      next: res => {
        this.connected = !!res?.connected;
        this.connectedAt = res?.connectedAt;
        this.user = res?.user;
      },
      error: () => {
        this.snack.open('Error loading status', 'OK', { duration: 3000 });
      }
    });
  }
}
