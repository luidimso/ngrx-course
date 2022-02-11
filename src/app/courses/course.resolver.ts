import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AuthState } from "../auth/reducers";
import { loadAllCourses } from "./course.action";
import { areCoursesLoaded } from "./course.selector";

@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading:boolean = false;

    constructor(
        private store: Store<AuthState>
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(select(areCoursesLoaded), tap(coursesLoaded => {
            if(!this.loading && !coursesLoaded) {
                this.loading = true;
                this.store.dispatch(loadAllCourses());
            }
        }),
        filter(coursesLoaded => coursesLoaded),
        first(),
        finalize(() => this.loading = false)
        )
    }
}