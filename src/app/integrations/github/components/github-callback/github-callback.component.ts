import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GithubIntegrationService } from '../../services/github-integration.service';

@Component({
  selector: 'app-github-callback',
  standalone: false,
  templateUrl: './github-callback.component.html',
  styleUrls: ['./github-callback.component.scss'],
})
export class GithubCallbackComponent implements OnInit {
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private svc: GithubIntegrationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];

      if (code) {
        // ✅ use service instead of direct HttpClient
        this.svc.callback(code).subscribe({
          next: (res: any) => {
            console.log('GitHub Callback Response:', res);

            if (res?.userId) {
              localStorage.setItem('userId', res.userId);
            }
            if (res?.userName) {
              localStorage.setItem('userName', res.userName);
            }

            this.snack.open('GitHub connected successfully!', 'OK', {
              duration: 3000,
            });

            // ✅ Redirect back to GitHub panel/dashboard
            this.router.navigate(['/github']);
          },
          error: (err) => {
            console.error('GitHub Callback Error:', err);
            this.snack.open('GitHub connection failed', 'OK', {
              duration: 3000,
            });
            this.loading = false;
          },
        });
      } else {
        this.snack.open('No code provided in callback', 'OK', {
          duration: 3000,
        });
        this.loading = false;
      }
    });
  }
}
