import React from 'react';
import {observer} from 'mobx-react';
import {Router} from 'director';
import OfferEntry from './offerEntry';
import OfferOverview from './offerOverview';


import DevTool from 'mobx-react-devtools';
if (process.env.BROWSER) {
	require('../styles/style.scss');
}

@observer
export default class OfferApp extends React.Component {
	render() {
		const {offerStore, viewStore} = this.props;
		return (
			<div className="app-wrapper">
				<div className="side-menu">
					<div className="user-image"></div>
					<ul>
						<li><a href="">Offers</a></li>
						<li><a href="">Clients</a></li>
						<li><a href="">Reports</a></li>

					</ul>
				</div>
			<div className="main-content Offers">
				<DevTool />
				<div className="Offers-top">
					<h1>offers</h1>
					<OfferEntry offerStore={offerStore} />
				</div>
				<div className="Offers-list">
					<OfferOverview offerStore={offerStore} viewStore={viewStore} />

				</div>

			</div>
			</div>

        );
	}

}

OfferApp.propTypes = {
	viewStore: React.PropTypes.object.isRequired,
	offerStore: React.PropTypes.object.isRequired
};
