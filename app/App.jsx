import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import LayoutRoute from "./layout/LayoutRoute";
import ImageList from "./page/ImageList";
import CveList from "./page/CveList";
import ImageDetails from "./page/ImageDetails";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <LayoutRoute exact path="/" component={ImageList}/>
                <LayoutRoute exact path="/image" component={ImageList}/>
                <LayoutRoute exact path="/image/details" component={ImageDetails}/>
                <LayoutRoute exact path="/cve" component={CveList}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
