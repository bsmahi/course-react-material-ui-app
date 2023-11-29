import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"

import AddCourse from "./components/add-course.component";
import Course from "./components/course.component";
import CoursesList from "./components/course-list.component";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              Course App
            </Typography>
            <Link to={"/courses"} className={classes.link}>
              <Typography variant="body2">
                Courses
              </Typography>
            </Link>
            <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
                Add
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path={["/", "/courses"]} component={CoursesList} />
          <Route exact path="/add" component={AddCourse} />
          <Route path="/courses/:id" component={Course} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);