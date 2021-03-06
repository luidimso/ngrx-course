import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducers/course.reducers";
import * as fromCourses from "./reducers/course.reducers";

export const selectCoursesState = createFeatureSelector<CoursesState>("course");

export const selectAllCourses = createSelector(selectCoursesState, fromCourses.selectAll);

export const selectBeginnerCourses = createSelector(selectAllCourses, courses => courses.filter((course) => {
    return course.category == 'BEGINNER';
}));

export const selectAdvancedCourses = createSelector(selectAllCourses, courses => courses.filter((course) => {
    return course.category == 'ADVANCED';
}));

export const selectPromoTotal = createSelector(selectAllCourses, courses => courses.filter((course) => {
    return course.promo;
}).length);

export const areCoursesLoaded = createSelector(selectCoursesState, state => state.allCoursesLoaded);