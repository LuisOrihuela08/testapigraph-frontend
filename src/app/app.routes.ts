import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
{
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
    path: 'home',
    component : HomeComponent
},
{
    path : 'posts',
    component : PostsComponent
}

];
