import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, Route} from '@angular/router';
import {AboutComponent} from '../about/about.component';
import {BlogComponent} from '../blog/blog.component';
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
// eslint-disable-next-line @nx/enforce-module-boundaries
import {Schedule} from "../../../apps/server/src/app/typeorm/entities/Schedule";
import {ScheduleItemComponent} from "../schedule/ui/schedule-item.component";

export const appRoutes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [userGuardFn],
    resolve: {
      schedules: () => inject(HttpService).get<Schedule[]>('api/schedules')
    }
  },
  {
    path: 'schedule/:id',
    component: ScheduleItemComponent,
    canActivate: [userGuardFn],
    resolve: {
      schedule: (route: ActivatedRouteSnapshot) => inject(HttpService).get<Training>(`api/schedules/${route.paramMap.get('id')}`)
    }
  },
  {path: 'blog', component: BlogComponent},
  {path: 'news', component: NewsComponent},
  {
    path: 'trainings',
    component: TrainingsComponent,
    resolve: {
      trainings: () => inject(HttpService).get<TrainingView[]>('api/trainings')
    }
  },
  {
    path: 'trainings/:id',
    component: TrainingExpandedComponent,
    resolve: {
      training: (route: ActivatedRouteSnapshot) => inject(HttpService).get<Training>(`api/trainings/${route.paramMap.get('id')}`)
    }
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'user',
    component: UserComponent,
    canActivate: [userGuardFn],
    resolve: {
      userSchedules: userSchedulesResolver
    }
  }
];
