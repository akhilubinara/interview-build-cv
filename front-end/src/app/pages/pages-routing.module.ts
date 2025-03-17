import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //     path: 'not-found', component: NotFoundComponent
  // },
  {
      path: '', redirectTo: 'user-list', pathMatch: 'full'
  },
  {
      path: 'user-list', loadChildren: () => import('./user-list/user-list.module').then(m=>m.UserListModule)
  },
  {
      path: 'add-user', loadChildren: () => import('./add-user/add-user.module').then(m=>m.AddUserModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
