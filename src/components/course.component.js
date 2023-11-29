import React, { Component } from "react";
import CourseDataService from "../services/course.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Course extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getCourse = this.getCourse.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

        this.state = {
            currentCourse: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCourse(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCourse: {
                    ...prevState.currentCourse,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentCourse: {
                ...prevState.currentCourse,
                description: description
            }
        }));
    }

    getCourse(id) {
        CourseDataService.get(id)
            .then(response => {
                this.setState({
                    currentCourse: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentCourse.id,
            title: this.state.currentCourse.title,
            description: this.state.currentCourse.description,
            published: status
        };

        CourseDataService.update(this.state.currentCourse.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentCourse: {
                        ...prevState.currentCourse,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCourse() {
        CourseDataService.update(
            this.state.currentCourse.id,
            this.state.currentCourse
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Course was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCourse() {
        CourseDataService.delete(this.state.currentCourse.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/courses')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentCourse } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentCourse ? (
                    <div className={classes.form}>
                        <h2>Course</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentCourse.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Description"
                                    name="description"
                                    value={currentCourse.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentCourse.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            {currentCourse.published ? (
                                <Button
                                    className={`${classes.publish} ${classes.button}`}
                                    onClick={() => this.updatePublished(false)}
                                >
                                    UnPublish
              </Button>
                            ) : (
                                    <Button
                                        className={`${classes.publish} ${classes.button}`}
                                        onClick={() => this.updatePublished(true)}
                                    >
                                        Publish
              </Button>
                                )}
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteCourse}
                            >
                                Delete
            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateCourse}
                            >
                                Update
            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Course...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Course)