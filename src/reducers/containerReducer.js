const INITIAL_STATE = { id: 0, parent_id: '', scannable: '', payload: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'CONTAINER_INFO':
	if(JSON.parse(action.payload)[0].length === 0) {
	    alert('Container not found...');
	    return INITIAL_STATE; 
	} else {
	    let containerArray = JSON.parse(action.payload)[0][0];
	    return {
		id: containerArray[0],
		parent_id: containerArray[1],
		scannable: containerArray[2],
		payload: containerArray[3] }; 
	}
    default:
	return state;
    }
}
