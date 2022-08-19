const INITIAL_STATE = {
    result: 'INITIAL',
    userInfo: { id: 0, login: '', password: '', currentLevel: ''},
    newUser: { newLogin: '', newPassword: '', newCurrentLevel: '' }
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case 'USERS_LIST':
	let usersList = JSON.parse(action.payload)[0];
	return { result: 'success', usersList: usersList }
    case 'USER_INFO':
	let userInfo = JSON.parse(action.payload)[0][0];
	return {
	    result: 'success',
	    userInfo: {
		id: userInfo[0],
		login: userInfo[1],
		password: userInfo[2],
		currentLevel: userInfo[3]}
	}
    case 'NEW_USER':
	return { result: 'success' }
    case 'UPDATE_USER':
	return { result: 'success',
		 userInfo:
		 { id: action.payload.id,
		   login: action.payload.login,
		   password: action.payload.password,
		   currentLevel: action.payload.currentLevel
		 }
	       }
    default:
	return state
    }
}
