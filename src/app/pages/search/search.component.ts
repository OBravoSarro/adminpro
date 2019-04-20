import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { Search } from '../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  resultSearch: Search;

  constructor(private activateRoute: ActivatedRoute, private _search: SearchService ) {
    this.activateRoute.params.subscribe(params => {
      if(params && params.hasOwnProperty('terms') && params.terms.length){
        this.search(params.terms);
      }
    });
  }

  private search (terms: string) {
    this._search.search(terms).subscribe( result => this.resultSearch = result );
  }

  ngOnInit() {
  }

}
