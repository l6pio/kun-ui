import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import {LayoutRoute} from "./layout/LayoutRoute";
import {Image} from "./page/Image";
import {Cve} from "./page/Cve";
import {ImageDetails} from "./page/ImageDetails";
import {CveDetails} from "./page/CveDetails";
import {Pod} from "./page/Pod";

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <LayoutRoute exact path="/" component={Pod}/>
                <LayoutRoute exact path="/image" component={Image}/>
                <LayoutRoute exact path="/image/details" component={ImageDetails}/>
                <LayoutRoute exact path="/cve" component={Cve}/>
                <LayoutRoute exact path="/cve/details" component={CveDetails}/>
            </Switch>
        </BrowserRouter>
    );
};
