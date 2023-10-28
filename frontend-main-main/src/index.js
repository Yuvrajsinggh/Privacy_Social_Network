import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";

import App from './App';
import './index.css'

ReactDOM.render(
   <Router>
     <ThemeProvider>
        <App/>
     </ThemeProvider>    
   </Router>,
document.getElementById('root'));