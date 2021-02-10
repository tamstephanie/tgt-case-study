import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Button, Typography, withStyles} from "@material-ui/core";
import {ArrowForward} from "@material-ui/icons";

import AppPage from "app/General/Containers/AppPage/AppPage";
import {ErrorPageStyle} from "./ErrorPage.style";

class ErrorPage extends PureComponent {
    render() {
        let {classes} = this.props;
        return (
            <div className={classes.errorPage + " error-page"}>
                <AppPage title="Page Not Found">
                    <Typography>
                        Oops! The page you are looking for was not found. It may be moved or not available.
                    </Typography>
                    <Button variant="outlined" href="#" endIcon={<ArrowForward />} color="secondary">
                        Return home
                    </Button>
                </AppPage>
            </div>
        );
    }
}

ErrorPage.propTypes = {
    /**
     * JSON object of CSS styling, which is then applied to the corresponding component(s)
     * @type {JSS}
     * @optional
     */
    classes: PropTypes.object,
};

export default withStyles(ErrorPageStyle)(ErrorPage);