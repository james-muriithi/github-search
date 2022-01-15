import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repositories-section',
  templateUrl: './repositories-section.component.html',
  styleUrls: ['./repositories-section.component.scss'],
})
export class RepositoriesSectionComponent implements OnInit {
  @Input() title: String = 'My Repositories';
  repositories: Number[] = new Array(6).fill(1);

  constructor() {}

  ngOnInit(): void {}
}
