import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ResultComponent } from "./components/result/result.component";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./components/about/about.component";

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'result', component: ResultComponent},
    { path: 'appComponent', component: AppComponent},
    { path: 'about', component: AboutComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
