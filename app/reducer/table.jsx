export const SaveImageListOrder = "SaveImageListOrder";
export const SaveCveListOrder = "SaveCveListOrder";

export function imageListOrder(state = {orderBy: "name", order: ""}, action) {
    return action.type === SaveImageListOrder ? action.value : state;
}

export function cveListOrder(state = {orderBy: "severity", order: "-"}, action) {
    return action.type === SaveCveListOrder ? action.value : state;
}
