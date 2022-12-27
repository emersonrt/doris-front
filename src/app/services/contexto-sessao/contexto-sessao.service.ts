import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, map, fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContextoSessaoService {

    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    updateValue(key: string, value: any) {
        if (this.storage) {
            this.storage.setItem(key, JSON.stringify(value));
            return true;
        }
        return false;
    }

    getValue(key: string): any {
        if (this.storage && this.storage.getItem(key)) {
            return JSON.parse(this.storage.getItem(key) || '');
        }
        return null;
    }

    watchvalue(key: string): Observable<any> {
        return fromEvent<StorageEvent>(window, "storage").pipe(
            filter(event => event.storageArea === localStorage),
            filter(event => event.key === key),
            map(event => event.newValue)
        )
    }

    removeValue(key: string): boolean {
        if (this.storage) {
            this.storage.removeItem(key);
            return true;
        }
        return false;
    }

    clearAllStorage(): boolean {
        if (this.storage) {
            this.storage.clear();
            return true;
        }
        return false;
    }
}
