import { Routes } from '@angular/router';
import { IndexComponent as UserIndexComponent } from './components/User/index/index.component';
export const routes: Routes = [

  {path:'', redirectTo:'Users' , pathMatch:'full'},
  {path:'Users', component: UserIndexComponent },
];
