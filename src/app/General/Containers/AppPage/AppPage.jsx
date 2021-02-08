import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Card, CardContent, Container, Typography, withStyles} from "@material-ui/core";

import {AppPageStyle} from "./AppPage.style";

class AppPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes} = this.props;
        return (
            <div className="app-page">
                <Container className={classes.header} maxWidth="xl">
                    <div className="app-title-card">
                        <Card className={classes.appTitle} raised={false}>
                            <CardContent>
                                <Typography variant="h1"><b>{this.props.title}</b></Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
                <Container className={classes.content}>
                    <Typography className="subtitle" variant="h2" gutterBottom>
                        <b>{this.props.subtitle}</b>
                    </Typography>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

AppPage.propTypes = {
    /**
     * Text to display at the top of the page
     * @type {String}
     */
    title: PropTypes.string.isRequired,
    /**
     * JSON object of CSS styling, which is then applied to the corresponding component(s)
     * @type {JSS}
     * @optional
     */
    classes: PropTypes.object,
    /**
     * Text to display right below the header at the top of the page's content
     * @type {String}
     * @optional
     */
    subtitle: PropTypes.string,
};

export default withStyles(AppPageStyle)(AppPage);