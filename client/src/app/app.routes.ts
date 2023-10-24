import {Route} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {NewsComponent} from "../news/news.component";
import {ScheduleComponent} from "../schedule/schedule.component";
import {BlogComponent} from "../blog/blog.component";
import {TrainingsComponent} from "../trainings/trainings.component";
import {AboutComponent} from "../about/about.component";
import {UserComponent} from "../user/user.component";

export const appRoutes: Route[] = [
    {path: '', component: HomeComponent},
    {path: 'news', component: NewsComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'news', component: NewsComponent},
    {path: 'trainings', component: TrainingsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'user', component: UserComponent}
];
