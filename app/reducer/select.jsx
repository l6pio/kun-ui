export const SaveImage = "SaveImage";
export const SaveCve = "SaveCve";

export function image(state = null, action) {
    return action.type === SaveImage ? action.value : state;
}

export function cve(state = null, action) {
    return action.type === SaveCve ? action.value : state;
}
