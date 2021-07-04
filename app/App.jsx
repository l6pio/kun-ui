import React from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import LayoutRoute from "./layout/LayoutRoute";
import Cve from "./page/security/Cve";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <LayoutRoute exact path="/" component={Cve}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
