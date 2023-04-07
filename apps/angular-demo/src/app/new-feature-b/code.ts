import { Observable } from "rxjs";

const moo$ = new Observable<string>();

moo$.subscribe();// 👍

moo$.subscribe((value) => { console.log(value) });// 👍 (I guess...)


class Cow {
    value!: string;

    constructor() {
        moo$.subscribe((value) => { this.value = value });// 👎
    }
}
