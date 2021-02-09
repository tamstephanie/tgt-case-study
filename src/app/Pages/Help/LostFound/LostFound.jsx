import React, {PureComponent} from "react";
import _ from "lodash";
import {Paper, Typography, withStyles} from "@material-ui/core";

// import MountedComponent from "app/Utilities/MountedComponent";
import AppPage from "app/General/Containers/AppPage/AppPage";
import {LostFoundStyle} from "./LostFound.style";

/**
 * The Lost & Found page
 */
class LostFound extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderText() {
        return (
            <React.Fragment>
                <Typography variant="h6">
                    <b>COVID-19 Update (March 22)</b>
                </Typography>
                <Typography paragraph color="textSecondary">
                    To reduce in-person interactions, Metro Transit's Lost &amp; Found window will close
                    effective Monday, March 23.
                </Typography>
                <Typography paragraph color="textSecondary">
                    Customer Relations/Lost &amp; Found staff are available by phone from
                    8 A.M. to 4:30 P.M. Monday through Friday. Please contact us at 612-373-3333,
                    option 3 for compliments, complaints, concerns related to our service, facilities,
                    equipment, website, mobile app, or lost &amp; found or use these online forms.
                </Typography>
                <Typography></Typography>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={this.props.classes.lostFoundPage + " lost-found-page"}>
                <AppPage title={"Lost & Found"}>
                    <Paper className={this.props.classes.pageContent + " page-content"} elevation={0}>
                        {this.renderText()}
                    </Paper>
                </AppPage>
            </div>
        );
    }
}

 export default withStyles(LostFoundStyle)(LostFound);