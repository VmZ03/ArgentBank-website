const initialState = {
    token: null,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    isLogged: false,
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload, isLogged: true }
        case 'IS_LOGGED':
            return { ...state, ...action.payload };
        case'EDIT_NAME':
            return { ...state, ...action.payload };
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default userReducer;
