import { BindableObserver } from "bindable-observer";
import { EventEmitter } from "events";

export const GlobalObserver = new BindableObserver(EventEmitter);
