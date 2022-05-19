import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchEvent = new EventEmitter<string>();

  search(term: string): void {
    this.searchEvent.emit(term);
  }
}
