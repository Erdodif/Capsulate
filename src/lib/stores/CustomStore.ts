import type { Subscriber } from "svelte/motion";
import type { Updater, Writable } from "svelte/store";

export class CustomStore<T> implements Writable<T> {
    protected _value: T;
    protected callbacks: Array<Subscriber<T>>

    constructor(initialValue: T) {
        this._value = initialValue;
        this.callbacks = [];
    }

    set(value: T): void {
        this._value = value;
        this.notify();
    }

    update(updater: Updater<T>): void {
        this._value = updater(this._value);
        this.notify();
    }

    subscribe(callback: (value: T) => void): (() => void) {
        callback(this._value);
        this.callbacks.push(callback);
        return () => this.unsubscribe(callback);
    }

    unsubscribe(callback: (value: T) => void) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }

    notify() {
        for (const callback of this.callbacks) {
            callback(this._value);
        }
    }
}

export abstract class CustomDerivedStore<T,E> extends CustomStore<T> {
    protected _store: CustomStore<E>;
    protected _unsubscibeParent;

    /**
     * Value checking callback what happens when the parent notifies it's subscribers
     * 
     * This method MUST deretmine whether the inner value changed, and act accordingly
     * @param newValue 
     */
    protected abstract parentChanged(newValue: E): boolean;

    constructor(store: CustomStore<E>, initValue: T) {
        super(initValue);
        this.callbacks = [];
        this._store = store;
        this._unsubscibeParent = this._store.subscribe((newValue) => {
            if (this.parentChanged(newValue)) this.nofity();
        });
    }

    set(value: T): void {
        this._value = value;
        this.notify();
        this.notifyParent();
    }

    subscribe(callback: (value: T) => void): (() => void) {
        callback(this._value);
        if (this.callbacks.length == 0) {
            this._unsubscibeParent = this._store.subscribe((newValue) => {
                if (this.parentChanged(newValue)) this.nofity();
            });
        }
        this.callbacks.push(callback);
        return () => this.unsubscribe(callback);
    }

    unsubscribe(callback: (value: T) => void) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
        if (this.callbacks.length == 0) {
            this._unsubscibeParent();
        }
    }

    nofity() {
        for (const callback of this.callbacks) {
            callback(this._value);
        }
    }

    /**
     * Tells the parent store that it's value got modified
     */
    notifyParent(): void {
        this._store.notify();
    }

}