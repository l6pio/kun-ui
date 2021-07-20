import {combineReducers} from "redux";
import {cveListOrder, imageListOrder} from "./table";
import {menuId} from "./menu";
import {cve, image} from "./select";

export const reducers = combineReducers({
    imageListOrder, cveListOrder,
    menuId, image, cve
});
