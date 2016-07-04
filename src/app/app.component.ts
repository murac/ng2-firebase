import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {BookmarkService} from "./bookmark.service";

@Component({
    selector: 'bookmark-app',
    providers: [HTTP_PROVIDERS, BookmarkService],
    template: require('./app.component.html')
})
export class AppComponent {
    bookmarks = [];
    constructor(private _bookmarkService:BookmarkService) {
        this._bookmarkService.getBookmarks()
            .then(bookmarks=>this.bookmarks=bookmarks);
    }
}