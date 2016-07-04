import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class BookmarkService {
    errorHandler = error => console.error('BookmarkService error', error);
    private baseUrl = 'https://ng2-course.firebaseio.com';

    constructor(private http:Http) {
    }

    getBookmarks() {
        return this.http.get(`${this.baseUrl}/bookmarks.json`)
            .toPromise()
            .then(response=>this.convert(response.json()))
            .catch(this.errorHandler);
    }

    addBookmark(bookmark) {
        const json = JSON.stringify(bookmark);
        return this.http.post(`${this.baseUrl}/bookmarks.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    updateBookmark(bookmark) {
        const json = JSON.stringify({
            title: bookmark.title,
            url: bookmark.url
        });
        return this.http.patch(`${this.baseUrl}/bookmarks/${bookmark.id}.json`, json)
            .toPromise()
            .catch(this.errorHandler);
    }

    removeBookmark(bookmark) {
        console.log(bookmark.id);
        return this.http.delete(`${this.baseUrl}/bookmarks/${bookmark.id}.json`)
            .toPromise()
            .catch(this.errorHandler);
    }

    private convert(parsedResponse) {
        if (parsedResponse === null) return [];
        return Object.keys(parsedResponse).map(id=>({
            id: id,
            title: parsedResponse[id].title,
            url: parsedResponse[id].url
        })).sort((a, b)=>a.title.localeCompare(b.title));
    }


}