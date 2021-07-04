export const SaveMenuId = "SaveMenuId";

export function menuId(state = 10, action) {
    return action.type === SaveMenuId ? action.value : state;
}
