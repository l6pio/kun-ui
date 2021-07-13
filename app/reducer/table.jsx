export const SaveImageListOrder = "SaveImageListOrder";
export const SaveArtifactListOrder = "SaveArtifactListOrder";
export const SaveCveListOrder = "SaveCveListOrder";

export function imageListOrder(state = {orderBy: "name", order: ""}, action) {
    return action.type === SaveImageListOrder ? action.value : state;
}

export function artifactListOrder(state = {orderBy: "name", order: ""}, action) {
    return action.type === SaveArtifactListOrder ? action.value : state;
}

export function cveListOrder(state = {orderBy: "severity", order: "-"}, action) {
    return action.type === SaveCveListOrder ? action.value : state;
}
