import {Route} from '@angular/router';
import {HttpService} from '../common/http.service';
import {HomeComponent} from "../home/home.component";
import {NewsComponent} from "../news/news.component";
import {ScheduleComponent} from "../schedule/schedule.component";
import {BlogComponent} from "../blog/blog.component";
import {TrainingsComponent} from "../trainings/trainings.component";
import {AboutComponent} from "../about/about.component";
import {UserComponent} from "../user/user.component";
import {inject} from "@angular/core";
import {DataService} from "../common/data.service";
import {userGuardFn} from "./util/guards";
import {userSchedulesResolver} from "./util/resolvers";
import {TrainingView} from "../common/model/Training";

export const appRoutes: Route[] = [
    {path: '', component: HomeComponent},
    {path: 'news', component: NewsComponent},
    {path: 'schedule', component: ScheduleComponent, canActivate: [() => inject(DataService).isLoggedIn()]},
    {path: 'blog', component: BlogComponent},
    {path: 'news', component: NewsComponent},
    {path: 'trainings', component: TrainingsComponent, resolve: {
      trainings: () => inject(HttpService).get<TrainingView[]>('api/trainings')
      }},
    {path: 'about', component: AboutComponent},
    {
        path: 'user', component: UserComponent, canActivate: [userGuardFn], resolve: {
            userSchedules: userSchedulesResolver
        }
    }
];
