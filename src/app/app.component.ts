import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {BookmarkService} from "./bookmark.service";
import {BookmarkListComponent} from "./bookmarklist.component";
import {BookmarkEditComponent} from "./bookmarkedit.component";

@Component({
    selector: 'bookmark-app',
    directives: [BookmarkListComponent, BookmarkEditComponent],
    providers: [HTTP_PROVIDERS, BookmarkService],
    template: require('./app.component.html')
})
export class AppComponent {
    bookmarks = [];
    editableBookmark = {};

    constructor(private _bookmarkService:BookmarkService) {
        this._bookmarkService.errorHandler = error => window.alert('BookmarkService Error: ');
        this.reload();
    }

    save(bookmark) {
        if (!bookmark.id) {
            this._bookmarkService.addBookmark(bookmark).then(()=>this.reload());
        } else {
            this._bookmarkService.updateBookmark(bookmark).then(()=>this.reload());
        }
        this.clear();

    }

    clear() {
        this.editableBookmark = {};
    }

    private reload() {
        return this._bookmarkService.getBookmarks().then(bookmarks=>this.bookmarks = bookmarks);
    }

    remove(bookmark) {
        console.log(bookmark);
        this._bookmarkService.removeBookmark(bookmark).then(()=>this.reload());
    }

    edit(bookmark) {
        this.editableBookmark = Object.assign({}, bookmark);
    }
}