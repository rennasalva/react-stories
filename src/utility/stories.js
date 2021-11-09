import { sortBy } from 'lodash';

const SORTS = {
    NONE: (list) => list,
    TITLE: (list) => sortBy(list, 'title'),
    AUTHOR: (list) => sortBy(list, 'author'),
    COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
    POINT: (list) => sortBy(list, 'points').reverse(),
};


export default SORTS;
