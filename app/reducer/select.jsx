export const SaveImageId = "SaveImageId";

export function imageId(state = "", action) {
    return action.type === SaveImageId ? action.value : state;
}
