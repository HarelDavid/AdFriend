import {observable} from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
	@observable offerBeingEdited = null;
	@observable offerFilter= ALL_TODOS;
}