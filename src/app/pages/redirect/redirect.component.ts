import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.navigate(
        this.activatedRoute.snapshot.queryParams.path.split('/')
    )
  }

}
