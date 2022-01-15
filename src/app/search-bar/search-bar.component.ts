import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  username:String = "";

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['username']) {
        this.username = params['username'];
      }      
    });
  }

  search(){
    if (!this.username) return;
    this.router.navigate(['user', this.username]);
  }

}
