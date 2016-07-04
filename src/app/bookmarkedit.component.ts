import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'bookmark-edit',
    template: require('./bookmarkedit.component.html')
})
export class BookmarkEditComponent {
    @Input() bookmark = {};
    @Output() clear = new EventEmitter();
    @Output() save = new EventEmitter();
    onSave(){
        this.save.emit(this.bookmark);
    }
    onClear(){
        this.clear.emit(null);
    }
}