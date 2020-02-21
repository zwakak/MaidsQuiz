import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './component/user-list/user-list';
import {UserDetailsComponent} from './component/user-details/user-details.component';


const routes: Routes = [
    { path: 'userlist', component: UserListComponent },
    { path: 'user/:id', component: UserDetailsComponent }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {}
