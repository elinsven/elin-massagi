import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface navBarItem {
  icon: string;
  route: string;
}

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent implements OnInit {
  navBarItems: navBarItem[] = [
    {
      icon: 'event',
      route: '/boka-tid',
    },
    {
      icon: 'forum',
      route: '/chatta',
    },
    {
      icon: 'logout',
      route: '/logout',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
