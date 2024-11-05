function setData(state, action) {
    if(!Array.isArray(action.payload))
        return [action.payload];
    
    return [...action.payload]
}
function addData(state, action) {
    if (Array.isArray(action.payload)) {
        return [...state,...action.payload]
    }
    return [...state, ...[action.payload]]
}

function deleteSpecificData(state, action) {
    const key = action.key ? action.key : 'id'
    const Index = state.findIndex((item) => item[key] === action.payload)
    if(Index>=0) {
        state.splice(Index, 1)
    }
    return [...state]
}
function editData(state, action) {
    const key = action.key ? action.key : 'id'
    const Index = state.findIndex((item) => item[key] === action.match)
    if (Index>=0) {
        state[Index] = action.payload
    }
    return [...state]
}

function appendData(state, action) {
    if (Array.isArray(action.payload)) {
        return [...state, ...action.payload]; 
    }
    return [...state, action.payload];
}


const initialData = []
function reducer(state, action) {
    switch (action.type) {
        case 'SET_DATA':
            return setData(state, action)
        case 'ADD_DATA':
            return addData(state, action)
        case 'EDIT_DATA':
            return editData(state, action)
        case 'APPEND_DATA':
            return appendData(state, action);
        case 'DELETE_SPECIFIC_DATA':
            return deleteSpecificData(state, action)
        default:
            throw new Error();
    }
}
export {
    initialData, reducer
}
