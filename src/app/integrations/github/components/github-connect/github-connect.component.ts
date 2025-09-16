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
  private clientId = 'Ov23liLJxobWRDGpOLhn';
  private redirectUri = 'http://localhost:4200/github/auth/callback'; // must match GitHub OAuth settings

  constructor(
    private svc: GithubIntegrationService,
    private snack: MatSnackBar
  ) { }

  connect() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=repo,user`;
    window.location.href = githubAuthUrl;
  }
}
