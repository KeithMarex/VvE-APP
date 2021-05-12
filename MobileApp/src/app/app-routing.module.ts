import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import {LoginComponent} from "~/app/login/login.component";
import {ForgotComponent} from "~/app/login/forgot/forgot.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'loginForgot', component: ForgotComponent},
  {
    path: 'home',
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
