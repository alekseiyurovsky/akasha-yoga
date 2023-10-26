import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Route} from '@angular/router';
import {AboutComponent} from '../about/about.component';
import {BlogComponent} from '../blog/blog.component';
import {DataService} from '../common/data.service';
import {HttpService} from '../common/http.service';
import {Training, TrainingView} from '../common/model/Training';
import {HomeComponent} from '../home/home.component';
import {NewsComponent} from '../news/news.component';
import {ScheduleComponent} from '../schedule/schedule.component';
import {TrainingsComponent} from '../trainings/trainings.component';
import {TrainingExpandedComponent} from '../trainings/ui/training-expanded.component';
import {UserComponent} from '../user/user.component';
import {userGuardFn} from './util/guards';
import {userSchedulesResolver} from './util/resolvers';

export const appRoutes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'schedule', component: ScheduleComponent, canActivate: [() => inject(DataService).isLoggedIn()]},
  {path: 'blog', component: BlogComponent},
  {path: 'news', component: NewsComponent},
  {
    path: 'trainings',
    component: TrainingsComponent,
    resolve: {trainings: () => inject(HttpService).get<TrainingView[]>('api/trainings')},
  },
  {
    path: 'trainings/:id', component: TrainingExpandedComponent, resolve: {
      training: (route: ActivatedRouteSnapshot) => inject(HttpService).get<Training>(`api/trainings/${route.paramMap.get('id')}`)
    }
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'user', component: UserComponent, canActivate: [userGuardFn], resolve: {
      userSchedules: userSchedulesResolver
    }
  }
];
