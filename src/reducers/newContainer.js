const INITIAL_STATE = { scannable: '', parent_id: '', payload: '' };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case 'CREATE_CONTAINER':
	return { result: 'success' }
    default:
	return state
    }
}
