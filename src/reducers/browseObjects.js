const INITIAL_STATE = { objectsList: []};
const exampleObject = {
    id: 0,
    scannable: '',
    container_scannable: '',
    quantity: '',
    buy_cost: '',
    sell_cost: '',
    expiration_date: '',
    payload: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case 'OBJECTS_LIST': 
	let objectsList = JSON.parse(action.payload)[0]; 
	return { objectsList: objectsList }
    default:
	return INITIAL_STATE;
    }
}
