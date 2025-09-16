import { Component } from '@angular/core';
import { GithubIntegrationService } from '../../services/github-integration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-github-connect',
  standalone: false,
  templateUrl: './github-connect.component.html',
  styleUrls: ['./github-connect.component.scss']
})
export class GithubConnectComponent {
  constructor(
    private svc: GithubIntegrationService,
    private snack: MatSnackBar
  ) { }

  connect() {
    this.svc.getAuthRedirect().subscribe({
      next: resp => {
        if (resp && resp.url) {
          window.location.href = resp.url;
        } else {
          this.snack.open('Could not get redirect url', 'OK', { duration: 3000 });
        }
      },
      error: () => {
        this.snack.open('Error initiating GitHub connection', 'OK', { duration: 3000 });
      }
    });
  }
}
