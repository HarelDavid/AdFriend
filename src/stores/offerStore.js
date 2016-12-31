import {observable, computed, reaction} from 'mobx';
import OfferModel from '../models/OfferModel'
import * as Utils from '../utils';
import * as firebase from 'firebase';




export default class OfferStore {
	@observable offers = [];


	subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			offers => fetch('/api/offers', {
				method: 'post',
				body: JSON.stringify({ offers }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}

	subscribeLocalstorageToStore() {
		reaction(
			() => this.toJS(),
			offers => localStorage.setItem('mobx-react-offermvc-offers', JSON.stringify({ offers }))
		);
	}

	addOffer (title, description, imageUrl) {
		var offer = new OfferModel(this, Utils.uuid(), title, description, imageUrl);
		this.offers.push(offer);
		var database = firebase.database();
		var offerRef = database.ref('/offers');
		var newkey = offerRef.push().key;
		offer.key = newkey;
		// var newRef = offerRef.child(newkey);

		//

		//
		firebase.database().ref('/offers').child(offer.key).set(offer);//{
			// 	username: "harel",
			// 	email: "hare@gg.com",
			// 	profile_picture : "sss"
			// });
			// //end init firebase//

		//

		//offer.key = newkey;
		// newRef.set(offer).
		// 	then((res) => {
		// 	console.log(res)
		// })
		// .catch((err) => {
		// 	console.log(err)
		// })
	}

	remove (offer) {

		offer.destroy();
		var database = firebase.database();
		var offersRef = database.ref('/offers');
		offersRef.child(offer.key).remove();

	}


	toJS() {
		return this.offers.map(offer => offer.toJS());
	}

	static fromJS(array) {
		const offerStore = new OfferStore();
		console.log("array",array)
		offerStore.offers = array.map(item => OfferModel.fromJS(offerStore, item));
		return offerStore;
	}
}
