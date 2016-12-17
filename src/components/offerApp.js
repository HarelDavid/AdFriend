import React from 'react';
import {observer} from 'mobx-react';
import {Router} from 'director';

import OfferEntry from './offerEntry';
import OfferOverview from './offerOverview';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import DevTool from 'mobx-react-devtools';

@observer
export default class OfferApp extends React.Component {
	render() {
		const {offerStore, viewStore} = this.props;
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>offers</h1>
					<OfferEntry offerStore={offerStore} />
				</header>
				<OfferOverview offerStore={offerStore} viewStore={viewStore} />

			</div>
		);
	}

}

OfferApp.propTypes = {
	viewStore: React.PropTypes.object.isRequired,
	offerStore: React.PropTypes.object.isRequired
};
