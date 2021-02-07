import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/Pages/MainApp/App';

function initialize() {
    /**
     * Good practice for real project would be to set a minimum required browser version 
     */

    // Render the application
    ReactDOM.render(<App />, document.getElementById('root'));
}

document.onclick = function (event) {
    event.stopPropagation();
}
initialize();