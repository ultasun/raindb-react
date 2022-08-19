const INITIAL_STATE = { scannableQuery: '' };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case 'SEARCH':
	return {
	    result: 'sure',
	    scannableQuery: action.payload.scannableQuery }
    default:
	return state
    }
}
