import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Card, CardContent, Container, Paper, Typography, withStyles} from "@material-ui/core";

import {AppPageStyle} from "./AppPage.style";

class AppPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.appPage}>
                <Container className={this.props.classes.header} maxWidth="xl">
                    <div className="app-title-card">
                        <Card className={this.props.classes.appTitle} raised={false}>
                            <CardContent>
                                <Typography variant="h4"><b>{this.props.title}</b></Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
                <div className={this.props.classes.content}>
                    {this.props.children}
                </div>
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
};

export default withStyles(AppPageStyle)(AppPage);