import _ from "lodash";

export const titleCase = (text) => {
    return _.startCase(text.toLowerCase());
} 