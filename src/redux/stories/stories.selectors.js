import {createSelector} from "reselect";

const selectStories = (state) => state.stories;

export const selectStoriedData = createSelector(
    [selectStories],
    stories => stories.list
);



