import {combineReducers} from "redux";
import {artifactListOrder, cveListOrder, imageListOrder} from "./table";
import {imageTabIdx, menuId} from "./menu";
import {imageId} from "./select";

const reducers = combineReducers({
    imageListOrder, artifactListOrder, cveListOrder,
    menuId, imageTabIdx, imageId
});

export default reducers;
