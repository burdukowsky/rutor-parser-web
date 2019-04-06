import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<string>();

  search: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSearchFormSubmit() {
    this.submitted.emit(this.search);
  }

}
