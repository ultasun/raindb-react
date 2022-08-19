const INITIAL_STATE = { newLogin: '', newPassword: '', newCurrentLevel: '' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case 'SUBMIT':
	return { result: 'success', id: 333 }
    default:
	return state
    }
}
