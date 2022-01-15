import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../shared/repository.model';

@Component({
  selector: 'app-repositories-section',
  templateUrl: './repositories-section.component.html',
  styleUrls: ['./repositories-section.component.scss'],
})
export class RepositoriesSectionComponent implements OnInit {
  @Input() title: String = 'My Repositories';
  @Input() userRepositories!: Repository[];

  constructor() {}

  ngOnInit(): void {}
}
