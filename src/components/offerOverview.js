import React from 'react';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import OfferItem from './offerItem';

@observer
export default class OfferOverview extends React.Component {




	componentDidMount(){

		console.log(this.props.offerStore);
	}
	render() {
		const {offerStore, viewStore} = this.props;
		if (offerStore.offers.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={offerStore.activeOfferCount === 0}
			/>
			<ul className="offer-list">
				{this.props.offerStore.offers.map(offer =>
					(<OfferItem
						key={offer.key}
						offer={offer}
						viewStore={viewStore}
					/>)
				)}
			</ul>
		</section>
	}

	// getVisibleOffers() {
	// 	return this.props.offerStore.offers.filter(offer => {
	// 		switch (this.props.viewStore.offerFilter) {
	// 			case ACTIVE_TODOS:
	// 				return !offer.completed;
	// 			case COMPLETED_TODOS:
	// 				return offer.completed;
	// 			default:
	// 				return true;
	// 		}
	// 	});
	// }

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.offerStore.toggleAll(checked);
	};
}


OfferOverview.propTypes = {
	viewStore: React.PropTypes.object.isRequired,
	offerStore: React.PropTypes.object.isRequired
}
