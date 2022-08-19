const INITIAL_STATE = {
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
    switch (action.type) {
    case 'OBJECT_INFO':
	if(JSON.parse(action.payload)[0][0].length === 0) {
	    alert('Object not found...');
	    return INITIAL_STATE; 
	} else {
	    let objectArray = JSON.parse(action.payload)[0][0];
	    return {
		id: objectArray[0],
		scannable: objectArray[1],
		container_scannable: objectArray[2],
		quantity: objectArray[3],
		buy_cost: objectArray[4],
		sell_cost: objectArray[5],
		expiration_date: objectArray[6],
		payload: objectArray[7]
	    }; 
	}
    default:
	return state;
    }
}
