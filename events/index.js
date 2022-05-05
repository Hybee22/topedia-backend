import { EventEmitter } from "events";
const emitter = new EventEmitter();

global.appEmitter = emitter;
