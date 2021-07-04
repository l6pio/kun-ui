export const SaveCveListOrder = "SaveCveListOrder";

export function cveListOrder(state = {orderBy: "severity", order: "-"}, action) {
    return action.type === SaveCveListOrder ? action.value : state;
}
