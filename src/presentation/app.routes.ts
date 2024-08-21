import { Routes } from '@angular/router';
import { IndexComponent as UserIndexComponent } from './components/User/index/index.component';
import { CreateComponent as UserCreateComponent } from './components/User/create/create.component';
import { EditComponent as UserEditComponent } from './components/User/edit/edit.component';
export const routes: Routes = [

  {path:'', redirectTo:'Users' , pathMatch:'full'},
  {path:'Users', component: UserIndexComponent },
  {path:'Users/Create', component: UserCreateComponent },
  {path:'Users/Edit/:id', component: UserEditComponent },
];
