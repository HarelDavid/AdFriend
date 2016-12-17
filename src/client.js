import 'todomvc-common';
import OfferStore from './stores/OfferStore';
import ViewStore from './stores/ViewStore';
import OfferApp from './components/adFriendApp.js';
import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

//start init firebase//

var config = {
	apiKey: "AIzaSyDieUaSUVR8dTDTsWb-UVkCXzkAn04G9KE",
	authDomain: "adfriend-73789.firebaseapp.com",
	databaseURL: "https://adfriend-73789.firebaseio.com",
	storageBucket: "adfriend-73789.appspot.com",
	messagingSenderId: "640171697438"
};
firebase.initializeApp(config);


const initialState = window.initialState && JSON.parse(window.initialState) || {};

var offerStore = OfferStore.fromJS(initialState.offers || []);
var viewStore = new ViewStore();

offerStore.subscribeServerToStore();

ReactDOM.render(
	<OfferApp offerStore={offerStore} viewStore={viewStore}/>,
	document.getElementById('offerapp')
);

if (module.hot) {
  module.hot.accept('./components/adFriendApp', () => {
    var NewOfferApp = require('./components/adFriendApp').default;
    ReactDOM.render(
      <NewOfferApp offerStore={offerStore} viewStore={viewStore}/>,
      document.getElementById('offerapp')
    );
  });
}

