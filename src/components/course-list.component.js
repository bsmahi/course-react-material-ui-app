import React, { Component } from "react";
import CourseDataService from "../services/course.service";
import { Link } from "react-router-dom";

import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCourse = this.setActiveCourse.bind(this);
    this.removeAllCourses = this.removeAllCourses.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCourses();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCourses() {
    CourseDataService.getAll()
      .then(response => {
        this.setState({
          Courses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCourses();
    this.setState({
      currentCourse: null,
      currentIndex: -1
    });
  }

  setActiveCourse(course, index) {
    this.setState({
      currentCourse: course,
      currentIndex: index
    });
  }

  removeAllCourses() {
    CourseDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    CourseDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          courses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchTitle, courses, currentCourse, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchTitle}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>Courses List</h2>

            <div className="list-group">
              {courses &&
                courses.map((course, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveCourse(course, index)}
                    divider
                    button
                    key={index}>
                    {course.title}
                  </ListItem>
                ))}
            </div>

            <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllCourses}
            >
              Remove All
            </Button>
          </Grid>
          <Grid item md={8}>
            {currentCourse ? (
              <div className={classes.course}>
                <h4>Course</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentCourse.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentCourse.description}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentCourse.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/courses/" + currentCourse.id}
                  className={classes.edit}
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p className={classes.course}>Please click on a Course...</p>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(CoursesList)