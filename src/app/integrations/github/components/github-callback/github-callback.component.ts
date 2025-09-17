import { Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../services/github-integration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-github-callback',
  standalone: false,
  templateUrl: './github-callback.component.html',
  styleUrls: ['./github-callback.component.scss']
})
export class GithubCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];      
      if (code) {
        // Send code to backend
        this.http.post('http://localhost:3000/api/github/callback', { code })
          .subscribe(res => {
            console.log('GitHub Token Response:', res);
          });
      }
    });
  }
}
