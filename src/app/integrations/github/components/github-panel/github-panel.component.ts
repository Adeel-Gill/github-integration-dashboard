import { Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../services/github-integration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-github-panel',
  standalone: false,
  templateUrl: './github-panel.component.html',
  styleUrls: ['./github-panel.component.scss']
})
export class GithubPanelComponent implements OnInit {
  connected = false;
  collections: string[] = [];
  selectedCollection: string = '';

  constructor(
    private svc: GithubIntegrationService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadStatus();
    this.loadCollections();
  }

  loadStatus() {
    this.svc.getStatus().subscribe({
      next: res => {
        this.connected = !!res?.connected;
      },
      error: () => {
        this.connected = false;
      }
    });
  }

  loadCollections() {
    this.svc.listCollections().subscribe({
      next: cols => {
        this.collections = cols || [];
        if (this.collections.length > 0) {
          this.selectedCollection = this.collections[0];
        }
      },
      error: () => {
        this.snack.open('Failed to load collections', 'OK', { duration: 3000 });
      }
    });
  }

  onRemove() {
    if (!confirm('Are you sure you want to remove the GitHub integration?')) {
      return;
    }
    this.svc.removeIntegration().subscribe({
      next: () => {
        this.snack.open('Integration removed', 'OK', { duration: 2000 });
        this.connected = false;
        this.collections = [];
        this.selectedCollection = '';
      },
      error: () => {
        this.snack.open('Failed to remove integration', 'OK', { duration: 3000 });
      }
    });
  }

  onResync() {
    this.svc.resyncIntegration().subscribe({
      next: () => {
        this.snack.open('Re-sync requested', 'OK', { duration: 2000 });
        this.loadCollections();
      },
      error: () => {
        this.snack.open('Failed to start re-sync', 'OK', { duration: 3000 });
      }
    });
  }
}
