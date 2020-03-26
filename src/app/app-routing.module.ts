import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableDemoComponent } from './pages/demo/data-table-demo/data-table-demo.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'demo', loadChildren: () => import('./pages/demo/demo.module').then(m => m.DemoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
