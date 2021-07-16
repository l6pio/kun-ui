import {combineReducers} from "redux";
import {artifactListOrder, cveListOrder, imageListOrder} from "./table";
import {menuId} from "./menu";
import {artifact, cve, image} from "./select";

export const reducers = combineReducers({
    imageListOrder, artifactListOrder, cveListOrder,
    menuId, image, artifact, cve
});
