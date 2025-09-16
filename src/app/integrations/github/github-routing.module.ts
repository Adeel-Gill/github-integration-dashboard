import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubPanelComponent } from './components/github-panel/github-panel.component';
import { GithubCallbackComponent } from './components/github-callback/github-callback.component';

const routes: Routes = [
  { path: '', component: GithubPanelComponent },
  { path: 'auth/callback', component: GithubCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubRoutingModule {}
