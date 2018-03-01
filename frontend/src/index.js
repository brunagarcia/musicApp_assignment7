import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './App';
import './index.css';


ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>
),document.getElementById('root'));
