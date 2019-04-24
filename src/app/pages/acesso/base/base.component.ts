import { Component, OnInit } from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('login => churches, login => password, churches => password', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            opacity: 1
          })
        ]),
        query(':enter', [
          style({ opacity: 0, left: '120%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0, left: '-120%'}))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ opacity: 1, left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('churches => login, password => login, password => churches', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            opacity: 1
          })
        ]),
        query(':enter', [
          style({ opacity: 0, left: '-120%'})
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0, left: '120%'}))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ opacity: 1, left: '0%'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    ])
  ]
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRoute.snapshot.url[
      outlet.activatedRoute.snapshot.url.length - 1
    ];
  }

}
