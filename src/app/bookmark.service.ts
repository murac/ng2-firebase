import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class BookmarkService {
    private baseUrl = 'https://ng2-course.firebaseio.com';

    constructor(private http:Http) {
    }

    getBookmarks() {
        return this.http.get(`${this.baseUrl}/bookmarks.json`).toPromise().then(response=>this.convert(response.json()));
    }
    addBookmark(bookmark){
        const json = JSON.stringify(bookmark);
        return this.http.post(`${this.baseUrl}/bookmarks.json`,json).toPromise();
    }

    updateBookmark(bookmark){
        const json = JSON.stringify(bookmark);
        return this.http.patch(`${this.baseUrl}/bookmarks/${bookmark.id}.json`,json).toPromise();
    }

    removeBookmark(bookmark) {
        return this.http.delete(`${this.baseUrl}/bookmarks/${bookmark.id}.json`).toPromise();
    }

    private convert(parsedResponse){
        return Object.keys(parsedResponse).map(id=>({
            id:id,
            title:parsedResponse[id].title,
            url:parsedResponse[id].url
        })).sort((a,b)=>a.title.localeCompare(b.title));
    }


}