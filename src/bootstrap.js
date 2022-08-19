import React from 'react';
import ReactDOM from 'react-dom';

//import history from './history';

// redux
import { createStore } from 'redux';
import user from './reducers/userReducer';
import container from './reducers/containerReducer';
import searchQuery from './reducers/searchQuery';
import newObject from './reducers/newObject';
import newContainer from './reducers/newContainer';
import manageUsers from './reducers/manageUsers';
import browseObjects from './reducers/browseObjects';
import browseContainers from './reducers/browseContainers';
import object from './reducers/objectReducer';

const currentUserStore = createStore(user);
const currentObjectStore = createStore(object);
const currentContainerStore = createStore(container);
const currentSearchStore = createStore(searchQuery);
const currentNewObjectStore = createStore(newObject);
const currentNewContainerStore = createStore(newContainer);
const currentManageUsersStore = createStore(manageUsers);
const currentBrowseObjectsStore = createStore(browseObjects);
const currentBrowseContainersStore = createStore(browseContainers);

import App from './components/app';

function main() {
    const reduxStores = {
	currentUserStore: currentUserStore,
	currentSearchStore: currentSearchStore,
	currentNewObjectStore: currentNewObjectStore,
	currentNewContainerStore: currentNewContainerStore,
	currentManageUsersStore: currentManageUsersStore,
	currentBrowseObjectsStore: currentBrowseObjectsStore,
	currentBrowseContainersStore: currentBrowseContainersStore,
	currentContainerStore: currentContainerStore,
	currentObjectStore: currentObjectStore};
    ReactDOM.render(
	<App reduxStores={reduxStores} />,
	document.querySelector('.app-wrapper'));
}

currentUserStore.subscribe(main);
currentManageUsersStore.subscribe(main);
//currentSearchStore.subscribe(main); // can probably delete it is not used
currentNewObjectStore.subscribe(main);
currentNewContainerStore.subscribe(main);
currentManageUsersStore.subscribe(main);
currentBrowseObjectsStore.subscribe(main);
currentBrowseContainersStore.subscribe(main);
currentObjectStore.subscribe(main);
currentContainerStore.subscribe(main);

document.addEventListener("DOMContentLoaded", main);
