import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import escape from 'jsesc';

import { renderToString } from 'react-dom/server'

import OfferStore from '../src/stores/OfferStore';
import ViewStore from '../src/stores/ViewStore';
import OfferApp from '../src/components/adFriendApp.js';
import React from 'react';
import * as firebase from 'firebase';

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


var configFirebase = {
	apiKey: "AIzaSyDieUaSUVR8dTDTsWb-UVkCXzkAn04G9KE",
	authDomain: "adfriend-73789.firebaseapp.com",
	databaseURL: "https://adfriend-73789.firebaseio.com",
	storageBucket: "adfriend-73789.appspot.com",
	messagingSenderId: "640171697438"
};
firebase.initializeApp(configFirebase);


const renderFullPage = html => {
	const initialState = { offers };
	const initialStateJSON = escape( // So safe!
		JSON.stringify(initialState),
		{ wrap: true, isScriptContext: true, json: true }
	);
	return `
	<!doctype html>
	<html lang="utf-8">
		<head>
			<link rel="stylesheet" href="/node_modules/offermvc-common/base.css">
			<link rel="stylesheet" href="/node_modules/offermvc-app-css/index.css">
			<script>
				window.initialState = ${initialStateJSON}
			</script>
		</head>
		<body>
			<section id="offerapp" class="offerapp">${html}</section>
			<script src="/static/bundle.js"></script>
			<footer class="info">
				<p>Double-click to edit a offer</p>
				<p>OfferMVC powered by React and <a href="http://github.com/mobxjs/mobx/">MobX</a>. Created by <a href="http://github.com/mweststrate/">mweststrate</a></p>
				<p>Based on the base React OfferMVC by <a href="http://github.com/petehunt/">petehunt</a></p>
				<p>Part of <a href="http://offermvc.com">OfferMVC</a></p>
			</footer>
		</body>
	</html>
	`
};


let offers = [];


app.use(bodyParser.json());

app.get('/', function(req, res) {
	var query = firebase.database().ref('/offers');

	query.on('value', (snap) => {
		snap.forEach((child) => {
			var item = {};
			console.log(child.key)
			item = child.val();
			item.key = child.key;
			offers.push(item);
		})


		const offerStore = OfferStore.fromJS(offers);
		const viewStore = new ViewStore();
		const initView = renderToString((
			<OfferApp offerStore={offerStore} viewStore={viewStore} />
		));

		const page = renderFullPage(initView);

		res.status(200).send(page);
	});



});

app.post('/api/offers', function(req, res) {
	offers = req.body.offers;
	if (Array.isArray(offers)) {
		console.log(`Updated offers (${offers.length})`);
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "expected `offers` to be array" }));
	}
});

app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
	console.log('uncaughtException: ', evt);
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
