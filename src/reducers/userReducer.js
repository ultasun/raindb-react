const INITIAL_STATE = {
    login: 'nobody',
    password: '',
    currentLevel: 'UNAUTHORIZED' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'AUTHENTICATE':
	if( typeof action.payload === 'string' ) {
	    if(JSON.parse(action.payload)[0][0].length === 0) {
		alert('Login failure: Bad username or bad password.');
		location.reload(); 
		return INITIAL_STATE; 
	    } else {
		let userArray = JSON.parse(action.payload)[0][0];
		return {
		    login: userArray[1],
		    password: userArray[2],
		    currentLevel: userArray[3] }; 
	    }
	}
    case 'CLEARSESSION':
	return INITIAL_STATE;
    default:
	return state;
    }
}
