import { Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../services/github-integration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-callback',
  standalone: false,
  templateUrl: './github-callback.component.html',
  styleUrls: ['./github-callback.component.scss']
})
export class GithubCallbackComponent implements OnInit {
  constructor(
    private svc: GithubIntegrationService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.svc.getStatus().subscribe({
      next: res => {
        if (res && res.connected) {
          this.snack.open('GitHub connection successful', 'OK', { duration: 2000 });
        } else {
          this.snack.open('GitHub connection failed', 'OK', { duration: 3000 });
        }
        this.router.navigate(['/integrations/github']);
      },
      error: () => {
        this.snack.open('Error confirming connection', 'OK', { duration: 3000 });
        this.router.navigate(['/integrations/github']);
      }
    });
  }
}
