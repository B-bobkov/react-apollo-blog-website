import React, { Component } from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withAddPost } from 'providers/posts';
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import Header from "components/Front/Header/Header.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TagsInput from "react-tagsinput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";
import newPostStyle from "assets/jss/material-dashboard-pro-react/views/admin/newPostStyle.jsx";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const styles = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
class NewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      tags:[],
      classicModal: false,
      noticeModal: false,
      smallModal: false
    }
    this.handleTags = this.handleTags.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onPublish = this.onPublish.bind(this);
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  onTitleChange(event) {
    event.preventDefault();
    this.setState({
      title:event.target.value
    });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }
  onPublish() {
    //console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
    this.props.addPost({
      title: this.state.title,
      content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    });
  }
  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand=""
          color="primary"
          links={
            <List className={classes.list + " " + classes.mlAuto}>
              <ListItem className={classes.listItem}>
                <Button type="button" color="transparent" className={classes.navLink}>
                    Save Draft
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button type="button" color="transparent" className={classes.navLink}
                  onClick={this.onPublish}
                >
                    Publish
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button type="button" color="transparent" className={classes.navLink}>
                    Settings
                </Button>
              </ListItem>
            </List>
          }
        />
        <GridContainer>
          <GridItem xs={12} sm={10} md={10}>
            <CustomInput
              id="title"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                placeholder: "Add Title",
                onChange:(event)=>this.onTitleChange(event)
              }}
            />
            <CustomInput
              id="slug"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "slug"
              }}
            />
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            
            <div>
              <h3>Categories</h3>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    tabIndex={-1}
                    // onClick={() => this.handleToggle(21)}
                    // checkedIcon={<Check className={classes.checkedIcon} />}
                    // icon={<Check className={classes.uncheckedIcon} />}
                    // classes={{
                    //   checked: classes.checked,
                    //   root: classes.checkRoot
                    // }}
                  />
                }
                // classes={{ label: classes.label }}
                label="Unchecked"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    tabIndex={-1}
                    // onClick={() => this.handleToggle(21)}
                    // checkedIcon={<Check className={classes.checkedIcon} />}
                    // icon={<Check className={classes.uncheckedIcon} />}
                    // classes={{
                    //   checked: classes.checked,
                    //   root: classes.checkRoot
                    // }}
                  />
                }
                // classes={{ label: classes.label }}
                label="Unchecked"
              />
            </div>
            <div>
              <h3>Tags</h3>
            </div>
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTags}
              tagProps={{ className: "react-tagsinput-tag primary" }}
            />
            <Button
              color="rose"
              round
              className={classes.marginRight}
              onClick={() => this.handleClickOpen("smallModal")}
            >
              Small alert modal
            </Button>
            <Dialog
              classes={{
                root: classes.center + " " + classes.modalRoot,
                paper: classes.modal + " " + classes.modalSmall
              }}
              open={this.state.smallModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => this.handleClose("noticeModal")}
              aria-labelledby="small-modal-slide-title"
              aria-describedby="small-modal-slide-description"
            >
              <DialogTitle
                id="small-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <Button
                  justIcon
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="transparent"
                  onClick={() => this.handleClose("smallModal")}
                >
                  <Close className={classes.modalClose} />
                </Button>
              </DialogTitle>
              <DialogContent
                id="small-modal-slide-description"
                className={
                  classes.modalBody + " " + classes.modalSmallBody
                }
              >
                <h5>Are you sure you want to do this?</h5>
              </DialogContent>
              <DialogActions
                className={
                  classes.modalFooter +
                  " " +
                  classes.modalFooterCenter
                }
              >
                <Button
                  onClick={() => this.handleClose("smallModal")}
                  color="transparent"
                  className={classes.modalSmallFooterFirstButton}
                >
                  Never Mind
                </Button>
                <Button
                  onClick={() => this.handleClose("smallModal")}
                  color="success"
                  simple
                  className={
                    classes.modalSmallFooterFirstButton +
                    " " +
                    classes.modalSmallFooterSecondButton
                  }
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
        </GridContainer>
      </div>
    );
  }
}

export default withAddPost(withStyles(newPostStyle)(NewPost));