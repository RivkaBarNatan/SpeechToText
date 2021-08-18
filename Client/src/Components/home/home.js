import * as React from 'react';
import template from "./home.jsx";
import axios from "axios";
import div from '@material-ui/core/Button';
import {InsertDriveFile, ArrowUpward, VolumeUpIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiSvgIcon-root': {
    fill: 'currentColor',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fontSize: '7rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    color: '#cc5813',
    transitionProperty: 'transform',
    transitionDuration: '.3s',
    transitionTimingFunction: 'ease-out'
    },
    '&:hover': {
      backgroundColor: "white"
    }
  },
})(() => null);

class home extends React.Component {
  //   render() {
  //     return template.call(this);
  //   }
  // }

  // export default home;

  // class App extends Component {

  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div className="body">
          <h2>פרטי קובץ</h2>
          <div className="innerBody">
            <p>שם קובץ: {this.state.selectedFile.name}</p>
            <p>סוג קובץ: {this.state.selectedFile.type}</p>
            <p>
              שונה לאחרונה:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="body">
          <br />
          <h4>בחר לפני לחיצה על כפתור העלאה</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="logo" style={{backgroundImage: `url("./background.png") noRepeat`, backgroundSize: 'cover'}}>
        <img width="10%" alt="Speech To Text" src="Speech To Text.png" />
      <div className="body">
        <h1 className="aaa">תמלול קובץ שמע</h1>
        <div>
          <div className="upup">
        <React.Fragment>
      <GlobalCss /><IconButton className="bb"
            variant="contained"
            component="label">
              
          <InsertDriveFile></InsertDriveFile><ArrowUpward style={{fill: "white",
                                                                  zIndex: '0',
                                                                  position: "absolute",
                                                                  fontSize: "40px",
                                                                  marginTop: "30px"}}/>
          
          <input
              type="file"
              hidden onChange={this.onFileChange}/>
        </IconButton></React.Fragment>
        </div>
          {/* <button onClick={this.onFileUpload}> 
                  העלה! 
                </button>  */}
        </div>
        {this.fileData()}
    
      </div>
      </div>
    );
  }
}

export default home;
