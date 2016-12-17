import React from 'react';
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class OfferItem extends React.Component {
	@observable editText = "";

	render() {
		const {viewStore, offer} = this.props;
		return (
			<li className={[
				offer.completed ? "completed": "",
				expr(() => offer === viewStore.offerBeingEdited ? "editing" : "")
			].join(" ")}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={offer.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{offer.title}
					</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>

				<div className="view">
					<img src={offer.imageUrl}/>
				</div>

				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	handleSubmit = (event) => {
		const val = this.editText.trim();
		if (val) {
			this.props.offer.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.offerBeingEdited = null;
	};

	handleDestroy = () => {
		this.props.offer.destroy();
		this.props.viewStore.offerBeingEdited = null;
	};

	handleEdit = () => {
		const offer = this.props.offer;
		this.props.viewStore.offerBeingEdited = offer;
		this.editText = offer.title;
	};

	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.offer.title;
			this.props.viewStore.offerBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event) => {
		this.editText = event.target.value;
	};

	handleToggle = () => {
		this.props.offer.toggle();
	};
}

OfferItem.propTypes = {
	offer: React.PropTypes.object.isRequired,
	viewStore: React.PropTypes.object.isRequired
};
