import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repositories-section',
  templateUrl: './repositories-section.component.html',
  styleUrls: ['./repositories-section.component.scss']
})
export class RepositoriesSectionComponent implements OnInit {

  @Input() title:String = "My Repositories";

  constructor() { }

  ngOnInit(): void {
  }

}
