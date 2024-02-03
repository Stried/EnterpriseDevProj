import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="253439392729-voms037aa2ipqsbtfjnhovlpmqd3e44r.apps.googleusercontent.com">
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>
);
