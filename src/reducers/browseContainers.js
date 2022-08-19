const INITIAL_STATE = { containersList: []};
// for now, cindi only works correctly with strings, unless you are the id.
const exampleContainer = { id: 0, parent_id: '', scannable: '', payload: '' };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case 'CONTAINERS_LIST': 
	let containersList = JSON.parse(action.payload)[0]; 
	return { containersList: containersList }
    default:
	return INITIAL_STATE;
    }
}
