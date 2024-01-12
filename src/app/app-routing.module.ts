import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch:"full"},
  {path:"welcome", component:WelcomeComponent},
  {path:"question", component: QuestionComponent},
  {path:"resource", component: ResourcesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
