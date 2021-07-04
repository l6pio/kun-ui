import {combineReducers} from "redux";
import {menuId} from "./menu";
import {cveListOrder} from "./order";

const reducers = combineReducers({
    menuId, cveListOrder
});

export default reducers;
