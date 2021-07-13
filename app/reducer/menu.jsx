export const SaveMenuId = "SaveMenuId";
export const SaveImageTabIdx = "SaveImageTabIdx";

export function menuId(state = 10, action) {
    return action.type === SaveMenuId ? action.value : state;
}

export function imageTabIdx(state = 0, action) {
    return action.type === SaveImageTabIdx ? action.value : state;
}
