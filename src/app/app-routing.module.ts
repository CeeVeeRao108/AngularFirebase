import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { WinnerListComponent } from './components/winners/winners.component';
import { ToppersListComponent } from './components/toppers/toppers.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'users', component: TutorialsListComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'winners', component: WinnerListComponent },
  { path: 'toppers', component: ToppersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
