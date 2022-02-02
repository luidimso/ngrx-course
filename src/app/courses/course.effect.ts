import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { allCoursesLoaded } from "./course.action";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffect {
    loadCourses$ = createEffect(() => this.acions$.pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap(action => this.coursesHttpService.findAllCourses()),
        map(courses => allCoursesLoaded({courses}))
    ));

    constructor(
        private acions$: Actions,
        private coursesHttpService: CoursesHttpService
    ){}

}