const INITIAL_STATE = {
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
    case 'CREATE_OBJECT': 
	return { result: 'success' }
    default:
	return state
    }
}
