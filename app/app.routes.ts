import { Component } from '@angular/core';
import { RouterConfig } from '@angular/router';
import {nsProvideRouter} from "nativescript-angular/router"
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {TerminalComponent}  from "./pages/operations/terminal.component";

export const routes: RouterConfig = [
  { path: "", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "terminal", component: TerminalComponent}
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, { enableTracing: false })
];