import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userDetails!:User;

  constructor() { }

  ngOnInit(): void {
  }

}
