import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'bookmark-list',
    template: require('./bookmarklist.component.html')
})
export class BookmarkListComponent {
    @Input() bookmarks = [];
    @Output() remove = new EventEmitter();
    @Output() edit = new EventEmitter();

    onRemove(bookmark){
        this.remove.emit(bookmark);
    }

    onEdit(bookmark){
        this.edit.emit(bookmark);
    }
}