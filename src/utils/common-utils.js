import { FALLBACK_IMAGE, MEMBER_FALLBACK_IMAGE } from "../constants/common-constants";

/**
 * Add a fallback picture if picture is not available
 * @param {*} event 
 */
export const handleImageError = (event, member) => {
    event.target.src = member ? MEMBER_FALLBACK_IMAGE : FALLBACK_IMAGE;
};
