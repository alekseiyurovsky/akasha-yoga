import {Route} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {NewsComponent} from "../news/news.component";

export const appRoutes: Route[] = [
    {path: '', component: HomeComponent},
    {path: 'news', component: NewsComponent}
];
