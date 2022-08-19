// copyright 2022 ultasun. all rights reserved. see the LICENSE.
//
// begin raindb-react/src/components/app.js
// ----------------------------------------------------------------------------
// begin imports section

import React from 'react';
import { BrowserRouter as Router,
	 Switch,
	 Route,
	 Link,
	 useParams,
	 useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import axios from 'axios';
import { CINDI_SERVER_ENDPOINT } from '../../cindi-env';

const SERVER_ENDPOINT = CINDI_SERVER_ENDPOINT;

// end imports section
// ----------------------------------------------------------------------------
// begin CINDI axios HTTP POST functions (three types: Container, Object, User)

function Container__doDeleteContainerById(id, history) {
    let cindiStmt = "DELETE IN containers id " + id;
    console.log(cindiStmt);
    return function() {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		if(history) {
		    history.push('/browse-containers');
		}
	    });
    }
}

function Container__doDeleteContainerByScannable(scannable, history) {
    let cindiStmt = "DELETE IN containers scannable " + scannable;
    console.log(cindiStmt);
    return function() {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		if(history) {
		    history.push('/browse-containers');
		}
	    });
    }
}

function Container__doGetContainerById(
    id,
    callback,
    currentContainerStore,
    containerInfoRef) {
    let cindiStmt = "READ IN containers id \""
	+ id + "\" FIELDS (id, parent_id, scannable, payload)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'CONTAINER_INFO',
		    payload: response.data
		});
		if(callback) {
		    callback(currentContainerStore, containerInfoRef);
		}
	    });
    }
}

function Container__doGetContainerByScannable(
    scannable,
    callback,
    currentContainerStore,
    history,
    containerInfoRef) {
    let cindiStmt = "READ IN containers scannable \""
	+ scannable + "\" FIELDS (id, parent_id, scannable, payload)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'CONTAINER_INFO',
		    payload: response.data
		});
		if(callback) {
		    callback(currentContainerStore, history, containerInfoRef);
		}
	    });
    }
}

function Container__doCreateContainer(
    newParentId,
    newScannable,
    newPayload,
    callback,
    history) {
    let cindiStmt = "CREATE IN containers "
	+"FIELDS(parent_id, scannable, payload) VALUES (\""
	+ newParentId + "\", \""
	+ newScannable + "\", \"" + newPayload + "\")";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'CREATE_CONTAINER',
		    payload: response.data
		});
		if(callback) {
		    callback(history);
		}
	    });
    }
}

function Container__doContainersList(
    callback,
    currentBrowseContainersStore,
    containersListRef) {
    let cindiStmt = 'READ IN containers ALL RECORDS '
	+'FIELDS (id, parent_id, scannable, payload)';
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log('Container__doObjectsList');
		console.log(response.data);
		dispatch({
		    type: 'CONTAINERS_LIST',
		    payload: response.data
		});
		if(callback) {
		    callback(currentBrowseContainersStore, containersListRef);
		}
	    });
    }    
}

function Container__doUpdateContainerById(
    id,
    scannable,
    parent_id,
    payload,
    callback,
    currentContainerStore,
    history) {
    let cindiStmt = "UPDATE IN containers id "
	+ id + " FIELDS (scannable, parent_id, payload) VALUES (\""
	+ scannable + "\", \"" + parent_id + "\", \"" + payload + "\")";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'UPDATE_CONTAINER',
		    payload: response.data
		});
		if(callback) {
		    callback(currentContainerStore, history);
		}
	    });
    }
}

function Object__orphanizeByContainerScannable(
    containerScannable,
    history) {
    let cindiStmt = 'UPDATE IN objects container_scannable '
	+ containerScannable + ' FIELDS (container_scannable) VALUES ("")';
    console.log(cindiStmt);
    return function() {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		if(history) {
		    history.push('/browse-containers');
		}
	    });
    }
}

function Object__doDeleteObjectById(id, history) {
    let cindiStmt = "DELETE IN objects id " + id;
    console.log(cindiStmt);
    return function() {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		if(history) {
		    history.push('/browse-objects');
		}
	    });
    }
}

function Object__doUpdateObjectById(
    id,
    scannable,
    container_scannable,
    quantity,
    buy_cost,
    sell_cost,
    expiration_date,
    payload,
    callback,
    currentObjectStore,
    history) {
    let cindiStmt = "UPDATE IN objects id "
	+ id + " FIELDS (scannable, container_scannable, quantity, buy_cost, "
	+ "sell_cost, expiration_date, payload) VALUES (\""
	+ scannable + "\", \"" + container_scannable + "\", \""
	+ quantity + "\", \"" + buy_cost + "\", \"" + sell_cost + "\", \""
	+ expiration_date + "\", \"" + payload + "\")";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'UPDATE_OBJECT',
		    payload: response.data
		});
		if(callback) {
		    callback(currentObjectStore, history);
		}
	    });
    }
}

function Object__doGetObjectById(
    id,
    callback,
    currentObjectStore,
    objectInfoRef) {
    let cindiStmt = "READ IN objects id \""
	+ id + "\" FIELDS (id, scannable, container_scannable, quantity, "
	+ "buy_cost, sell_cost, expiration_date, payload)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'OBJECT_INFO',
		    payload: response.data
		});
		if(callback) {
		    callback(currentObjectStore, objectInfoRef);
		}
	    });
    }
}

function Object__doCreateObject(
    newScannable,
    newContainerScannable,
    newQuantity,
    newBuyCost,
    newSellCost,
    newExpirationDate,
    newPayload,
    callback,
    history) {
    let cindiStmt = "CREATE IN objects "
	+ "FIELDS (scannable, container_scannable, quantity, buy_cost, "
	+ "sell_cost, expiration_date, payload) VALUES (\"" + newScannable
	+ "\", \"" + newContainerScannable + "\", \"" + newQuantity
	+  "\", \"" + newBuyCost +  "\", \"" + newSellCost + "\", \"" 
	+ newExpirationDate +  "\", \"" + newPayload + "\")";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'CREATE_OBJECT',
		    payload: response.data
		});
		if(callback) {
		    callback(history);
		}
	    });
    }
}

function Object__doObjectsList(
    callback,
    currentBrowseObjectsStore,
    objectListRef) {
    let cindiStmt = "READ IN objects ALL RECORDS "
	+ "FIELDS (id, scannable, container_scannable, quantity, buy_cost, "
	+ "sell_cost, expiration_date, payload)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'OBJECTS_LIST',
		    payload: response.data
		});
		if(callback) {
		    callback(currentBrowseObjectsStore, objectListRef);
		}
	    });
    }
}

function Object__doGetObjectByScannable(
    scannable,
    callback,
    currentContainerStore,
    history,
    containerInfoRef) {
    let cindiStmt = "READ IN objects scannable \""
	+ scannable + "\" FIELDS (id, scannable, container_scannable, "
	+ "quantity, buy_cost, sell_cost, expiration_date, payload)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'OBJECT_INFO',
		    payload: response.data
		});
		if(callback) {
		    callback(currentContainerStore, history, containerInfoRef);
		}
	    });
    }
}

function User__doCreateUser(
    newLogin,
    newPassword,
    newCurrentLevel,
    callback,
    history) {
    let cindiStmt = "CREATE IN users FIELDS(login, password, currentLevel) "
	+"VALUES (\"" + newLogin + "\", \""
	+ newPassword + "\", \"" + newCurrentLevel + "\")";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'CREATE_USER',
		    payload: response.data
		});
		if(callback) {
		    callback(history);
		}
	    });
    }
}

function User__doAuthentication(login, password, callback, history) {
    let cindiStmt = "READ IN users password \""
	+ password + "\" FIELDS (id, login, password, currentLevel)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'AUTHENTICATE',
		    payload: response.data
		});
		if(callback) {
		    callback(history);
		}
	    });
    }
}

function User__doUpdateUserById(
    id,
    login,
    password,
    currentLevel,
    callback,
    currentManageUsersStore,
    history) {
    let cindiStmt = "UPDATE IN users id "
	+ id + " FIELDS (login, password, currentLevel) VALUES (\""
	+ login + "\", \"" + password + "\", \"" + currentLevel + "\")";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'UPDATE_USER',
		    payload: response.data
		});
		if(callback) {
		    callback(currentManageUsersStore, history);
		}
	    });
    }
}

function User__doGetUserById(
    id,
    callback,
    currentManageUsersStore,
    userInfoRef) {
    let cindiStmt = "READ IN users id \""
	+ id + "\" FIELDS (id, login, password, currentLevel)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'USER_INFO',
		    payload: response.data
		});
		if(callback) {
		    callback(currentManageUsersStore, userInfoRef);
		}
	    });
    }
}

function User__doDeleteUserById(id, history) {
    let cindiStmt = "DELETE IN users id " + id;
    console.log(cindiStmt);
    return function() {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		if(history) {
		    history.push('/manage-users');
		}
	    });
    }
}

function User__doUsersList(
    currentManageUsersStore,
    callback,
    history,
    usersListRef) {
    let cindiStmt = "READ IN users ALL RECORDS "
	+"FIELDS (id, login, password, currentLevel)";
    console.log(cindiStmt);
    return function(dispatch) {
	axios.post(SERVER_ENDPOINT, cindiStmt)
	    .then(response => {
		console.log(response.data);
		dispatch({
		    type: 'USERS_LIST',
		    payload: response.data
		});
		if(callback) {
		    callback(currentManageUsersStore, history, usersListRef);
		}
	    });
    }
}

// end CINDI axios HTTP POST functions 
// ----------------------------------------------------------------------------
// begin React App definition

function App(props) {
    return (
	<Router>
	    <div>
		<div className="topbar">
		    <Link className="public-link" to="/about">
			About
		    </Link>
		    <Link className="public-link" to="/">
			Home
		    </Link> 
		    <div className="appLogoBox">RainDB</div>
		    { TopBar__isAuthorized_browseContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      ( <a href="/">Logout</a> )
		      :
		      ( null ) }{ " " }
		    { TopBar__isAuthorized_manageUsers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      ( <Link to="/manage-users">
			    Manage Users
			</Link> )
		      :
		      ( null ) }{ " " }
		    { TopBar__isAuthorized_manageUsers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      ( <Link to="/new-user">
			    New User
			</Link> )
		      :
		      ( null ) }{ " " }
		    { TopBar__isAuthorized_newObjects(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ? ( <Link to="/new-object">
			      New Object
			  </Link> )
		      :
		      ( null ) }{ " " }
		    { TopBar__isAuthorized_browseObjects(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      ( <Link to="/browse-objects">
			    Browse Objects
			</Link> )
		      :
		      ( null ) }{ " " }
		    { TopBar__isAuthorized_newContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      ( <Link to="/new-container">
			    New Container
			</Link> )
		      :
		      ( null ) }{ " " }
		    { TopBar__isAuthorized_browseContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      ( <Link to="/browse-containers">
			    Browse Containers
			</Link> )
		      :
		      ( null ) }{ " " }
		</div>
		<hr />
		<Switch>
		    <Route exact path='/'>
			<Home
			    currentUserStore={
				props.reduxStores.currentUserStore
			    }
			    currentContainerStore={
				props.reduxStores.currentContainerStore
			    }
			    currentObjectStore={
				props.reduxStores.currentObjectStore
			    }
			    currentSearchStore={
				props.reduxStores.currentSearchStore
			    } />
		    </Route>
		    <Route path='/about'>
			<About
			    currentUserStore={
				props.reduxStores.currentUserStore
			    } />
		    </Route>
		    { TopBar__isAuthorized_manageUsers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/manage-users'>
			   <ManageUsers
			       currentManageUsersStore={
				   props.reduxStores.currentManageUsersStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_manageUsers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/new-user'>
			   <NewUser
			       currentManageUsersStore={
				   props.reduxStores.currentManageUsersStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_newObjects(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/new-object'>
			   <NewObject
			       currentNewObjectStore={
				   props.reduxStores.currentNewObjectStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_newContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/new-container'>
			   <NewContainer
			       currentNewContainerStore={
				   props.reduxStores.currentNewContainerStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_browseObjects(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/browse-objects'>
			    <BrowseObjects
				currentBrowseObjectsStore={
				    props.reduxStores.currentBrowseObjectsStore
				} />
			</Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_browseContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/browse-containers'>
			   <BrowseContainers
			       currentBrowseContainersStore={
				   props.reduxStores
				       .currentBrowseContainersStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_browseObjects(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/object-info/:id'>
			   <ObjectInfo
			       currentSearchStore={
				   props.reduxStores.currentSearchStore}
			       currentObjectStore={
				   props.reduxStores.currentObjectStore}
			       currentNewObjectStore={
				   props.reduxStores.currentNewObjectStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_browseContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/container-info/:id'>
			   <ContainerInfo
			       currentSearchStore={
				   props.reduxStores.currentSearchStore}
			       currentContainerStore={
				   props.reduxStores.currentContainerStore}
			       currentNewContainerStore={
				   props.reduxStores.currentNewContainerStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_manageUsers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/user-info/:id'>
			   <UserInfo
			       currentManageUsersStore={
				   props.reduxStores.currentManageUsersStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		    { TopBar__isAuthorized_browseContainers(
			props.reduxStores.currentUserStore.getState()
			    .currentLevel)
		      ?
		      (<Route path='/scannable-info/:scannable'>
			   <ScannableInfo
			       currentSearchStore={
				   props.reduxStores.currentSearchStore}
			       currentContainerStore={
				   props.reduxStores.currentContainerStore}
			       currentNewContainerStore={
				   props.reduxStores.currentNewContainerStore
			       } />
		       </Route> )
		      :
		      ( null ) }
		</Switch>
	    </div>
	</Router>
    );
}

export default App;

// end React App definition
// ----------------------------------------------------------------------------
// begin "is authorized" helper functions, used by Routes/Links in App function

function TopBar__isAuthorized_manageUsers(level) {
    return level === 'ADMIN';
}

function TopBar__isAuthorized_newObjects(level) {
    return level === 'ADMIN' || level === 'POWER';
}

function TopBar__isAuthorized_browseObjects(level) {
    return level === 'ADMIN' || level === 'POWER' || level === 'READO';
}

function TopBar__isAuthorized_newContainers(level) {
    return level === 'ADMIN' || level === 'POWER';
}

function TopBar__isAuthorized_browseContainers(level) {
    return level === 'ADMIN' || level === 'POWER' || level === 'READO';
}

// end "is authorized" helper functions
// ----------------------------------------------------------------------------
// begin "Home / Search" page section (the role changes if logged in)

function Home__loginForm_onSubmit_onResponse(history) {
    history.push('/');
}

function Home__loginForm_onSubmit(values) {
    User__doAuthentication(
	values.login,
	values.password,
	Home__loginForm_onSubmit_onResponse,
	values.history)(values.currentUserStore.dispatch);
    values.currentUserStore.dispatch({
	type: 'AUTHENTICATE', payload: values
    });
    return true;
}

function Home__loginForm(currentUserStore, history) {   
    return (
	<Form
	    onSubmit={Home__loginForm_onSubmit}
	    initialValues={
		{ login: '',
		  password: '',
		  currentUserStore: currentUserStore,
		  history: history }}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">Username</label>
			    <Field
				name='login'
				component='input'
				type='text'
				placeholder='Login' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">Password</label>
			    <Field
				name='password'
				component='input'
				type='password'
				placeholder='Password' />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Submit
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
			</div>
		    </form>
		)
	    }
	/>
    );
}

function SearchBox__searchForm_onSubmit_onResponse(
    currentStore,
    history,
    containerInfoRef) {
    let searchResult = currentStore.getState();
    if(searchResult.id !== 0) {
	if(Object.keys(searchResult).includes('parent_id')) {
	    history.push('/container-info/' + searchResult.id);
	} else { 
	    history.push('/object-info/' + searchResult.id);
	}
    }
}

function SearchBox__searchForm_onSubmit(values) {
    Container__doGetContainerByScannable(
	values.scannableQuery,
	SearchBox__searchForm_onSubmit_onResponse,
	values.props.currentContainerStore,
	values.history,
	null)(values.props.currentContainerStore.dispatch);
    Object__doGetObjectByScannable(
	values.scannableQuery,
	SearchBox__searchForm_onSubmit_onResponse,
	values.props.currentObjectStore,
	values.history,
	null)(values.props.currentObjectStore.dispatch);
}

function SearchBox__render_searchForm(props, history) {
    return (
	<Form
	    onSubmit={SearchBox__searchForm_onSubmit}
	    initialValues={
		{ scannableQuery: '', props: props, history: history }}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Scan a Container or Object to Search for..."}
			    </label>
			    <Field
				name='scannableQuery'
				component='input'
				type='text' placeholder='...' />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Submit
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
		       </div>
		   </form>
		)
	    }
	/>
    );
}

function SearchBox__render(props, history) {
    return (
	<div>
	    <h2 className="pageTitle">
		Home
	    </h2>
	    <hr />
	    <div>
		{SearchBox__render_searchForm(props, history)}
	    </div>
	</div>
    );
}

function Home(props) {
    let history = useHistory();
    return (
	<div>
	    <h3>
		<i>Welcome, {props.currentUserStore.getState().login}!</i>
	    </h3>
	    <hr />
	    {props.currentUserStore.getState().currentLevel === 'UNAUTHORIZED'
	     ?
	     ( Home__loginForm(props.currentUserStore, history))
	     :
	     (SearchBox__render(props, history))
	    }
	    <hr />
	</div>
    );
}

// end "Home / Search" page section 
// ----------------------------------------------------------------------------
// begin "About" page section 

function About(props) {
    return (
	<div>
	    <h2 className="pageTitle">
		About
	    </h2>
	    <hr />
	    <div className="aboutList">
		<ul>
		    <li>
			Welcome! This is a simple web application for managing
			virtual inventory <i className="emphasis">objects</i>
			&nbsp;which may be (optionally) assigned to virtual
			<i className="emphasis">
			    &nbsp;containers
			</i>.
		    </li>
		    <ul>
			<li>
			    <a href="https://github.com/ultasun/raindb-react">
				RainDB-React
			    </a>
			    is a
			    <a href="https://reactjs.org/">
				React
			    </a>
			    application, utilizing
			    <a href="https://redux.js.org/">
				React Redux
			    </a>
			    and
			    <a href="https://final-form.org/react">
				React Final-Form
			    </a>.
			</li>
			<li>
			    <a href="https://github.com/ultasun/raindb">
				RainDB
			    </a>
			    exists in order to illustrate and test the
			    <a href="https://pypi.org/project/cindi/">
				CINDI
			    </a>
			    Meta-DBMS.
			</li>
		    </ul>
		</ul>
	    </div>
	    <hr />
	</div>
    );
}

// end "About" page section
// ----------------------------------------------------------------------------
// begin "New User" page section (accessible as ADMIN)

function ManageUsers__render_newUserForm_onSubmit_onResponse(history) {
    history.push('/manage-users');
}

function ManageUsers__render_newUserForm_onSubmit(values) {
    User__doCreateUser(
	values.newLogin,
	values.newPassword,
	values.newCurrentLevel,
	ManageUsers__render_newUserForm_onSubmit_onResponse,
	values.history)(values.props.currentManageUsersStore.dispatch);
    values.props.currentManageUsersStore.dispatch(
	{type: 'NEW_USER', payload: values });
    return true; 
}

function ManageUsers__render_newUserForm(props, history) {
    return (
	<Form
	    onSubmit={ManageUsers__render_newUserForm_onSubmit}
	    initialValues={
		{ newLogin: '',
		  newPassword: '',
		  newCurrentLevel: '',
		  props: props,
		  history: history }}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"New Username"}
			    </label>
			    <Field
				name='newLogin'
				component='input'
				type='text'
				placeholder='Choose a login'
			    />
			</div>
			<div className="loginForm">
			    <label
				className="loginForm_label">
				{"New Password"}
			    </label>
			    <Field
				name='newPassword'
				component='input'
				type='password'
				placeholder='Choose a password'
			    />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"New Current Level (ADMIN, POWER, or READO)"}
			    </label>
			    <Field
				name='newCurrentLevel'
				component='input'
				type='text'
				placeholder='ADMIN, POWER, or READO'
			    />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Submit
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
			</div>
			<hr />
			<div>
			    <h3 className="pageTitle">
				Explanation of Levels
			    </h3>
			    <div className="levelHelpArea">
				<div className="tableCell">
				    <h4 className="pageTitle">
					ADMIN
				    </h4>
				    Perform any task
				</div>
				<div className="tableCell">
				    <h4 className="pageTitle">
					POWER
				    </h4>
				    Only work on objects and containers
				</div>
				<div className="tableCell">
				    <h4 className="pageTitle">
					READO
				    </h4>
				    Update and delete objects and containers.
				    May not create objects and containers.
				</div>
			    </div>
			</div> 
		    </form>
		)
	    }
	/>
    );
}

function NewUser(props) {
    let history = useHistory();
    return (
	<div>
	    <h2 className="pageTitle">
		New User
	    </h2>
	    <hr />
	    {ManageUsers__render_newUserForm(props, history)}
	    <hr />
	</div>
    );
}

// end "New User" page section
// ----------------------------------------------------------------------------
// begin "Manage Users" page section (accessible as ADMIN)

function ManageUsers__render_usersList(
    currentManageUsersStore,
    history,
    usersListRef) {
    let divUsersList = document.getElementById(usersListRef);
    // warning, without any innerHTML on this element, react will loop-reload
    divUsersList.innerHTML = '<hr class="hrTableHeader" />'; 
}

function ManageUsers__render_usersListJsx(currentManageUsersStore) {
    let usersList = currentManageUsersStore.getState().usersList; 
    let resultJsx = [];
    usersList.forEach(user => {
	resultJsx.push(
	    <div className="tableRow" key={user[0]}>
		<div className="tableCell">
		    <Link to={"/user-info/" + user[0]}>
			{user[0]}
		    </Link>
		</div>
		<div className="tableCell">
		    {user[1]}
		</div>
		<div className="tableCell">
		    {user[2]}
		</div>
		<div className="tableCell">
		    {user[3]}
		</div>
	    </div>
	);
    });
    if(usersList.length === 0) {
	resultJsx.push(<div>No users</div>);
    }
    return resultJsx;
}

function ManageUsers(props) {
    let usersListRef = 33333;
    let history = useHistory();
    if(document.getElementById(usersListRef) == null
       || document.getElementById(usersListRef) === '') {
	let usersList = User__doUsersList(
	    props.currentManageUsersStore,
	    ManageUsers__render_usersList,
	    history,
	    usersListRef)(props.currentManageUsersStore.dispatch);
	return (
	    <div>
		<h2 className="pageTitle">
		    Users
		</h2>
		<hr />
		<div className="tableHeader">
		    <div className="tableCell">
			User ID
		    </div>
		    <div className="tableCell">
			User Username
		    </div>
		    <div className="tableCell">
			User Password
		    </div>
		    <div className="tableCell">
			Current User Level
		    </div>
		</div>
		<div id={usersListRef}>
		</div>
	    </div>
	);
    } else {
	let usersListJsx = ManageUsers__render_usersListJsx(
	    props.currentManageUsersStore);
	console.log(usersListJsx);
	return (
	    <div>
		<h2 className="pageTitle">
		    Users
		</h2>
		<hr />
		<div className="tableHeader">
		    <div className="tableCell">
			User ID
		    </div>
		    <div className="tableCell">
			User Username
		    </div>
		    <div className="tableCell">
			User Password
		    </div>
		    <div className="tableCell">
			Current User Level
		    </div>
		</div>
		<div id={usersListRef}>
		</div>
		<div>
		    {[usersListJsx]}
		</div>
		<hr />
	    </div>
	);
    }
}

// end "Manage Users" page section 
// ----------------------------------------------------------------------------
// begin "New Object" page section (accessible from POWER or ADMIN)

function NewObject__render_entryForm_onSubmit_onResponse(history) {
    history.push('/browse-objects');
}

function NewObject__render_entryForm_onSubmit(values) {
    Object__doCreateObject(
	values.newScannable,
	values.newContainerScannable,
	values.newQuantity,
	values.newBuyCost,
	values.newSellCost,
	values.newExpirationDate,
	values.newPayload,
	NewObject__render_entryForm_onSubmit_onResponse,
	values.history)(values.props.currentNewObjectStore.dispatch);
    values.props.currentNewObjectStore.dispatch(
	{ type: 'CREATE_OBJECT', payload: values }
    );
}

function NewObject__render_entryForm(props, history) {
    return (
	<Form
	    onSubmit={NewObject__render_entryForm_onSubmit}
	    initialValues={
		{ newScannable: '',
		  newContainerScannable: '',
		  newQuantity: '',
		  newBuyCost: '',
		  newSellCost: '',
		  newExpirationDate: '',
		  newPayload: '',
		  props: props,
		  history: history }}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Scannable Identifier"}
			    </label>
			    <Field
				name='newScannable'
				component='input'
				type='text'
				placeholder='Barcode Value' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Resident Container Scannable"}
			    </label>
			    <Field
				name='newContainerScannable'
				component='input'
				type='text'
				placeholder='Container Scannable' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Quantity of Units"}
			    </label>
			    <Field
				name='newQuantity'
				component='input'
				type='number'
				placeholder='Quantity of Units' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Purchase Cost"}
			    </label>
			    <Field
				name='newBuyCost'
				component='input'
				type='number'
				placeholder='Cost units bought at' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Customer Cost"}
			    </label>
			    <Field
				name='newSellCost'
				component='input'
				type='number'
				placeholder='Cost units sold at' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Expiration Date"}
			    </label>
			    <Field
				name='newExpirationDate'
				component='input'
				type='text'
				placeholder='Expiration Date' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Payload"}
			    </label>
			    <Field
				name='newPayload'
				component='textarea'
				type='text'
				placeholder='Optional Payload' />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Submit
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
			</div>
		    </form>
		)
	    }
	/>
    );
}

function NewObject(props) {
    let history = useHistory();
    return (
	<div>
	    <h2 className="pageTitle">
		New Object
	    </h2>
	    <hr />
	    <div>
		{NewObject__render_entryForm(props, history)}
	    </div>
	    <hr />
	</div>
    );
}

// end "New Object" page section 
// ----------------------------------------------------------------------------
// begin "New Container" page section (accessible as ADMIN or POWER)

function NewContainer__render_entryForm_onSubmit_onResponse(history) {
    history.push('/browse-containers');
}

function NewContainer__render_entryForm_onSubmit(values) {
    Container__doCreateContainer(
	values.newParentId,
	values.newScannable,
	values.newPayload,
	NewContainer__render_entryForm_onSubmit_onResponse,
	values.history)(values.props.currentNewContainerStore.dispatch);
    values.props.currentNewContainerStore.dispatch(
	{ type: 'CREATE_CONTAINER', payload: values }
    );
}

function NewContainer__render_entryForm(props, history) {
    return (
	<Form
	    onSubmit={NewContainer__render_entryForm_onSubmit}
	    initialValues={
		{ newScannable: '',
		  newParentId: '',
		  newPayload: '',
		  props: props,
		  history: history }}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Scannable Identifier"}
			    </label>
			    <Field
				name='newScannable'
				component='input'
				type='text'
				placeholder='Barcode Value' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Parent Container Identifier"}
			    </label>
			    <Field
				name='newParentId'
				component='input'
				type='text'
				placeholder='Parent Container ID' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Payload"}
			    </label>
			    <Field
				name='newPayload'
				component='input'
				type='text'
				placeholder='Optional Payload' />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Submit
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
			</div>
		    </form>
		)
	    }
	/>
    );
}

function NewContainer(props) {
    let history = useHistory();
    return (
	<div>
	    <h2 className="pageTitle">
		New Container
	    </h2>
	    <hr />
	    <div>
		{NewContainer__render_entryForm(props, history)}
	    </div>
	    <hr />
	</div>
    );
}

// end "New Container" page section
// ----------------------------------------------------------------------------
// begin "Browse Objects" page section (accessible from READO, ADMIN, POWER)

function BrowseObjects__render_objectsList(
    currentBrowseObjectsStore,
    objectsListRef) {
    let divObjectsList = document.getElementById(objectsListRef);
    // without any innnerHTML on the element, then React will reload the
    // page constantly
    divObjectsList.innerHTML = '<hr class="hrTableHeader"/>'; 
}

function BrowseObjects__render_objectsListJsx(currentBrowseObjectsStore) {
    let resultJsx = [];
    let objectsList = currentBrowseObjectsStore.getState().objectsList; 
    objectsList.forEach(obj => {
	resultJsx.push(
	    <div className="objectsTableRow" key={obj[0]}>
		<div className="objectsTableCell">
		    <Link to={"/object-info/" + obj[0]}>
			{obj[0]}
		    </Link>
		</div>
		<div className="objectsTableCell">
		    {obj[1]}
		</div>
		<div className="objectsTableCell">
		    { obj[2].length > 0
		      ? 
		      ( <Link to={"/scannable-info/" + obj[2]}>
			    {obj[2]}
			</Link> )
		      :
		      ( <i className="emphasis">Orphan Object</i> )
		    }
		</div>
		<div className="objectsTableCell">
		    {obj[3]}
		</div>
		<div className="objectsTableCell">
		    {obj[4]}
		</div>
		<div className="objectsTableCell">
		    {obj[5]}
		</div>
		<div className="objectsTableCell">
		    {obj[6]}
		</div>
		<div className="objectsTableCell">
		    {obj[7]}
		</div>
	    </div>);
    });
    if(objectsList.length === 0) {
	resultJsx.push(<div><br />No objects</div>);
    }
    return resultJsx;    
}

function BrowseObjects(props) {
    let objectsListRef = 334433;
    if(document.getElementById(objectsListRef) == null
       || document.getElementById(objectsListRef).innerHTML === '') {
	let objectsList =
	    Object__doObjectsList(BrowseObjects__render_objectsList,
				  props.currentBrowseObjectsStore,
				  objectsListRef)(props
						  .currentBrowseObjectsStore
						  .dispatch);
	return (
	    <div>
		<h2 className="pageTitle">
		    Browse Objects
		</h2>
		<hr />
		<div className="objectsTableHeader">
		    <div className="objectsTableCell">
			ID
		    </div>
		    <div className="objectsTableCell">
			Scannable
		    </div>
		    <div className="objectsTableCell">
			Container
		    </div>
		    <div className="objectsTableCell">
			Quantity
		    </div>
		    <div className="objectsTableCell">
			Buy Price
		    </div>
		    <div className="objectsTableCell">
			Sell Price
		    </div>
		    <div className="objectsTableCell">
			Expiry
		    </div>
		    <div className="objectsTableCell">
			Payload
		    </div>
		</div>
		<div id={objectsListRef}>
		</div>
	    </div>);
    } else {
	let objectsListJsx =
	    BrowseObjects__render_objectsListJsx(props
						 .currentBrowseObjectsStore);
	return (
	    <div>
		<h2 className="pageTitle">
		    Browse Objects
		</h2>
		<hr />
		<div className="objectsTableHeader">
		    <div className="objectsTableCell">
			ID
		    </div>
		    <div className="objectsTableCell">
			Scannable
		    </div>
		    <div className="objectsTableCell">
			Container
		    </div>
		    <div className="objectsTableCell">
			Quantity
		    </div>
		    <div className="objectsTableCell">
			Buy Price
		    </div>
		    <div className="objectsTableCell">
			Sell Price
		    </div>
		    <div className="objectsTableCell">
			Expiry
		    </div>
		    <div className="objectsTableCell">
			Payload
		    </div>
		</div>
		<div id={objectsListRef}>
		</div>
		<div>{[objectsListJsx]}</div>
		<hr />
	    </div>
	);
    }
}

// end "Browse Objects" page section 
// ----------------------------------------------------------------------------
// begin "Browse Containers" page section (usable by ADMIN, POWER, READO)

function BrowseContainers__render_containersList(
    currentBrowseContainersStore,
    containersListRef) {
    let divContainersList = document.getElementById(containersListRef);
    divContainersList.innerHTML = '<hr class="hrTableHeader"/>';
}

function BrowseContainers__render_containersListJsx(
    currentBrowseContainersStore) {
    let resultJsx = [];
    let containersList = currentBrowseContainersStore
	.getState().containersList;
    containersList.forEach(
	obj => {
	    resultJsx.push(
		<div className="tableRow" key={obj[0]}>
		    <div className="tableCell">
			<Link to={"/container-info/" + obj[0]}>
			    {obj[0]}
			</Link>
		    </div>
		    <div className="tableCell">
			{ obj[1].length > 0
			  ?
			  ( <Link to={"/scannable-info/" + obj[1]}>
				{obj[1]}
			    </Link> )
			  :
			  ( <i className="emphasis">Orphan Container</i> )
			}
		    </div>
		    <div className="tableCell">
			{obj[2]}
		    </div>
		    <div className="tableCell">
			{obj[3]}
		    </div>
		</div>
	    );
	}
    );
    if(containersList.length === 0) {
	resultJsx.push(<div><br />No containers</div>);
    }
    return resultJsx;		
}

function BrowseContainers(props) {
    let containersListRef = 443344;
    if(document.getElementById(containersListRef) == null
       || document.getElementById(containersListRef).innerHTML === '') {
	let containersList =
	    Container__doContainersList(
		BrowseContainers__render_containersList,
		props.currentBrowseContainersStore,
		containersListRef)(props
				   .currentBrowseContainersStore.dispatch);
	return (
	    <div>
		<h2 className="pageTitle">Browse Containers</h2>
		<hr />
		<div className="tableHeader">
		    <div className="tableCell">
			ID
		    </div>
		    <div className="tableCell">
			Parent Container
		    </div>
		    <div className="tableCell">
			Scannable
		    </div>
		    <div className="tableCell">
			Payload
		    </div>
		</div>
		<div id={containersListRef}></div>
		<hr />
	    </div>
	);
    } else {
	let containersListJsx =
	    BrowseContainers__render_containersListJsx(
		props.currentBrowseContainersStore);
	return (
	    <div>
		<h2 className="pageTitle">Browse Containers</h2>
		<hr />
		<div className="tableHeader">
		    <div className="tableCell">
			ID
		    </div>
		    <div className="tableCell">
			Parent Container
		    </div>
		    <div className="tableCell">
			Scannable
		    </div>
		    <div className="tableCell">
			Payload
		    </div>
		</div>
		<div id={containersListRef}></div>
		<div>{[containersListJsx]}</div>
		<hr />
	    </div>
	);
    }
}

// end "Browse Containers" page section
// ----------------------------------------------------------------------------
// begin "Container Info" page section (accessible by ADMIN, POWER, READO)

function ContainerInfo__render_updateForm_onSubmit_onResponse(
    currentContainerStore,
    history) {
    alert('The update was submitted successfully.');
}

function ContainerInfo__render_updateForm_onSubmit(values) {
    Container__doUpdateContainerById(
	values.id,
	values.scannable,
	values.parent_id,
	values.payload,
	ObjectInfo__render_updateForm_onSubmit_onResponse,
	values.props.currentContainerStore,
	values.history)(values.props.currentContainerStore.dispatch);
    values.props.currentContainerStore.dispatch(
	{ type: 'UPDATE_CONTAINER', payload: values }
    );
}

function ContainerInfo__render_updateForm(props, history) {
    let currentContainer = props.currentContainerStore.getState();
    currentContainer.props = props;
    currentContainer.history = history;
    return (
	<Form
	    onSubmit={ContainerInfo__render_updateForm_onSubmit}
	    initialValues={currentContainer}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Internal ID"}
			    </label>
			    <Field
				name='id'
				disabled={true}
				component='input'
				type='number' />
			</div>
			<div className="loginForm">
			    <label
				className="loginForm_label">
				{"Scannable Identifier"}
			    </label>
			    <Field
				name='scannable'
				component='input'
				type='text' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Parent Container Identifier"}
			    </label>
			    <Field
				name='parent_id'
				component='input'
				type='text' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Payload"}
			    </label>
			    <Field
				name='payload'
				component='input'
				type='text' />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Update Container
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
			    Reset</button>
			</div>
		    </form>
		)
	    }
	/>
    );
}

function ContainerInfo__deleteContainer(id, history) {
    let deleteContainer = Container__doDeleteContainerById(id, history)();
}

function ContainerInfo__onLoad(currentContainerStore, containerInfoRef) {
    let divContainerInfo = document.getElementById(containerInfoRef);
    divContainerInfo.innerHTML = "<hr />";
}

function ContainerInfo(props) {
    let { id } = useParams();
    let history = useHistory();
    let containerInfoRef = 78372;
    if(document.getElementById(containerInfoRef) == null
       || document.getElementById(containerInfoRef).innerHTML === '') {
	let containerInfo = Container__doGetContainerById(
	    id,
	    ContainerInfo__onLoad,
	    props.currentContainerStore,
	    containerInfoRef)(props.currentContainerStore.dispatch);
    }
    return (
	<div>
	    <h2 className="pageTitle">
		Container Info
	    </h2>
	    <hr />
	    {ContainerInfo__render_updateForm(props, history)}
	    <div id={containerInfoRef}></div>
	    <div className="loginForm">
		<p>Delete the &nbsp;
		    <i className="emphasis">
			container
		    </i>
		    . All associated &nbsp;
		    <i className="emphasis">
			objects
		    </i>
		    &nbsp; will become orphans.
		</p>
		<button
		    className="loginForm_label"
		    onClick={(event) => {
			Object__orphanizeByContainerScannable(
			    props.currentContainerStore.getState().scannable,
			    null)(); // this is not "the javascript way" ?
			ContainerInfo__deleteContainer(id, history);}}>
		    Delete Container
		</button>
	    </div>
	    <hr />
	</div>
    );
}

// end "Container Info" page section 
// ----------------------------------------------------------------------------
// begin "Scannable Info" page section (usable by ADMIN, POWER, READO)
// *** ScannableInfo does the same thing as ContainerInfo, except the
// *** URL/Route parameters are configured to look up Containers by their
// *** 'scannable' (not by their 'id' -- ContainerInfo is for the 'id')

function ScannableInfo__onLoad(currentContainerStore, containerInfoRef) {
    let divContainerInfo = document.getElementById(containerInfoRef);
    // without any innerHTML, the react page will reload-loop.
    divContainerInfo.innerHTML = "<hr />";
}

function ScannableInfo__deleteContainer(scannable, history) {
    let deleteContainer =
	Container__doDeleteContainerByScannable(scannable,
						history)();
}

function ScannableInfo(props) {
    let { scannable } = useParams();
    let history = useHistory();
    let containerInfoRef = 78372;
    if(document.getElementById(containerInfoRef) == null ||
       document.getElementById(containerInfoRef).innerHTML === '') {
	let containerInfo = Container__doGetContainerByScannable(
	    scannable,
	    ScannableInfo__onLoad,
	    props.currentContainerStore,
	    containerInfoRef)(props.currentContainerStore.dispatch);
    }
    return (
	<div>
	    <h2 className="pageTitle">Container Info</h2>
	    <hr />
	    {ContainerInfo__render_updateForm(props, history)}
	    <div id={containerInfoRef}></div>
	    <div className="loginForm">
		<p>Delete the &nbsp;
		    <i className="emphasis">
			container
		    </i>
		    . All associated &nbsp;
		    <i className="emphasis">
			objects
		    </i>
		    &nbsp; will become orphans.
		</p>
		<button
		    className="loginForm_label"
		    onClick={(event) => {
			Object__orphanizeByContainerScannable(
			    scannable, null)(); // this is not "the way" ?
			ScannableInfo__deleteContainer(scannable, history);}}>
		    Delete Container
		</button>
	    </div>
	    <hr />
	</div>
    );
}

// end "Scannable Info" page section
// ----------------------------------------------------------------------------
// begin "Object Info" page section (usable for ADMIN, POWER, READO roles)

function ObjectInfo__render_updateForm_onSubmit_onResponse(values) {
    alert('The update was submitted successfully.');
}

function ObjectInfo__render_updateForm_onSubmit(values) {
    Object__doUpdateObjectById(
	values.id,
	values.scannable,
	values.container_scannable,
	values.quantity,
	values.buy_cost,
	values.sell_cost,
	values.expiration_date,
	values.payload,
	ObjectInfo__render_updateForm_onSubmit_onResponse,
	values.props.currentObjectStore,
	values.history)(values.props.currentObjectStore.dispatch);
    values.props.currentObjectStore.dispatch(
	{ type: 'UPDATE_OBJECT', payload: values });
}

function ObjectInfo__render_updateForm(props, history) {
    let currentObject = props.currentObjectStore.getState();
    currentObject.props = props;
    currentObject.history = history;
    return (
	<Form
	    onSubmit={ObjectInfo__render_updateForm_onSubmit}
	    initialValues={currentObject}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Internal ID"}
			    </label>
			    <Field
				disabled={true}
				name='id'
				component='input'
				type='number'/>
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Scannable Identifier"}
			    </label>
			    <Field
				name='scannable'
				component='input'
				type='text'
				placeholder='Barcode Value' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Resident Container Identifier"}
			    </label>
			    <Field
				name='container_scannable'
				component='input'
				type='text'
				placeholder='Container Scannable' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Quantity of Units"}
			    </label>
			    <Field
				name='quantity'
				component='input'
				type='number'
				placeholder='Quantity of Units' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Purchase Cost"}
			    </label>
			    <Field
				name='buy_cost'
				component='input'
				type='number'
				placeholder='Cost units bought at' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Customer Cost"}
			    </label>
			    <Field
				name='sell_cost'
				component='input'
				type='number'
				placeholder='Cost units sold at' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Expiration Date"}
			    </label>
			    <Field
				name='expiration_date'
				component='input'
				type='text'
				placeholder='Expiration Date' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Payload"}
			    </label>
			    <Field
				name='payload'
				component='input'
				type='text' />
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Update Object
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
			</div> 
		    </form>
		)
	    }
	/>
    );
}

function ObjectInfo__deleteObject(id, history) {
    let deleteObject = Object__doDeleteObjectById(id, history)();
}

function ObjectInfo__onLoad(currentObjectStore, objectInfoRef) {
    let divObjectInfo = document.getElementById(objectInfoRef);
    // without any innerHTML on this element, then React will load-loop 
    divObjectInfo.innerHTML = "<hr />";
}

function ObjectInfo(props) {
    let { id } = useParams();
    let history = useHistory();
    let objectInfoRef = 83727;

    if(document.getElementById(objectInfoRef) == null
       || document.getElementById(objectInfoRef).innerHTML === '') {
	let objectInfo =
	    Object__doGetObjectById(id,
				    ObjectInfo__onLoad,
				    props.currentObjectStore,
				    objectInfoRef)(props
						   .currentObjectStore
						   .dispatch);
    }
    
    return (
	<div>
	    <h2 className="pageTitle">
		Object Info
	    </h2>
	    <hr />
	    {ObjectInfo__render_updateForm(props, history)}
	    <div id={objectInfoRef}>
	    </div>
	    <div className="loginForm">
		<p>Delete the &nbsp;
		    <i className="emphasis">
		    object</i>
		    .
		</p>
		<button
		    className="loginForm_label"
		    onClick={(event) => {
			ObjectInfo__deleteObject(id, history);
		    }}>
		    Delete Object
		</button>
	    </div> 
	    <hr />
	</div>
    );
}

// end "Object Information" page section
// ----------------------------------------------------------------------------
// begin "User Information" page section (accessible by ADMIN role)

function UserInfo__render_updateForm_onSubmit_onResponse(
    currentManageUsersStore,
    history) {
    alert('The update was submitted successfully.');
    history.push('/manage-users');
}

function UserInfo__render_updateForm_onSubmit(values) {
    User__doUpdateUserById(
	values.id,
	values.login,
	values.password,
	values.currentLevel,
	UserInfo__render_updateForm_onSubmit_onResponse,
	values.props.currentManageUsersStore,
	values.history)(values.props.currentManageUsersStore.dispatch);
    values.props.currentManageUsersStore.dispatch(
	{ type: 'UPDATE_USER', payload: values }
    );
}

function UserInfo__render_updateForm(props, history) {
    let currentUser = props.currentManageUsersStore.getState().userInfo;
    if(currentUser) {
	currentUser.props = props;
	currentUser.history = history;
    }
    return (
	<Form
	    onSubmit={UserInfo__render_updateForm_onSubmit}
	    initialValues={currentUser}
	    render={
		({ handleSubmit, form, submitting, pristine, values }) => (
		    <form onSubmit={handleSubmit}>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Internal ID"}
			    </label>
			    <Field
				name='id'
				disabled={true}
				component='input'
				type='number' />
			</div>
			<div className="loginForm">
			    <label
				className="loginForm_label">
				{"Username"}
			    </label>
			    <Field
				name='login'
				component='input'
				type='text' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"Password"}
			    </label>
			    <Field
				name='password'
				component='input'
				type='password' />
			</div>
			<div className="loginForm">
			    <label className="loginForm_label">
				{"User Access Level (ADMIN, POWER, or READO)"}
			    </label>
			    <Field
				name='currentLevel'
				component='input'
				type='text'
				placeholder='ADMIN, POWER or READO'/>
			</div>
			<div className="loginForm">
			    <button
				className="loginForm_label"
				type='submit'
				disabled={submitting || pristine}>
				Update User
			    </button>
			    <button
				className="loginForm_label"
				type='button'
				onClick={form.reset}
				disabled={submitting || pristine}>
				Reset
			    </button>
			</div>
		    </form>
		)
	    }
	/>
    );
}

function UserInfo__deleteUser(id, history) {
    let deleteUser = User__doDeleteUserById(id, history)();
}

function UserInfo__onLoad(currentManageUsersStore, userInfoRef) {
    let divUserInfo = document.getElementById(userInfoRef);
    // without any innerHTML on the element, then React will load-loop
    divUserInfo.innerHTML = "<hr />";
}

function UserInfo(props) {
    let { id } = useParams();
    let history = useHistory();
    let userInfoRef = 185771;

    if(document.getElementById(userInfoRef) == null
       || document.getElementById(userInfoRef).innerHTML === '') {
	let userInfo =
	    User__doGetUserById(
		id,
		UserInfo__onLoad,
		props.currentManageUsersStore,
		userInfoRef)(props.currentManageUsersStore.dispatch);
    }
    return (
	<div>
	    <h2 className="pageTitle">
		User Info
	    </h2>
	    <hr />
	    {UserInfo__render_updateForm(props, history)}
	    <br />
	    <div id={userInfoRef}></div>
	    <br />
	    <div className="loginForm">
		<p>Delete the &nbsp;
		    <i className="emphasis">
			user
		    </i>
		    .
		</p>
		<button
		    className="loginForm_label"
		    onClick={(event) => {
			UserInfo__deleteUser(id, history);
		    }}>
		    Delete User
		</button>
	    </div>
	    <hr />
	</div>
    );
}

// end "User Information" page section 
// ----------------------------------------------------------------------------
// end of raindb-react/src/components/app.js
