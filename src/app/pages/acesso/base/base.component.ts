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
        query(':enter, :leave', style({
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        })),
        query(':enter', style({ opacity: 0, transform: 'translateX(100%)' })),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)'}))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)'}))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('churches => login, password => login, password => churches', [
          query(':enter, :leave', style({
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
          })),
          query(':enter', style({ opacity: 0, transform: 'translateX(-100%)' })),
          query(':leave', animateChild()),
          group([
              query(':leave', [
                  animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100%)'}))
              ]),
              query(':enter', [
                  animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)'}))
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
