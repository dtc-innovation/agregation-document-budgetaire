
export const ASYNC_STATUS = Symbol('async status property name');

export const STATUS_PENDING = Symbol('async status pending')
export const STATUS_ERROR = Symbol('async status error')
export const STATUS_VALUE = Symbol('async status value')

export function makeAsyncMutationFunctions(statePropName){
    return {
        setPending(state, pendingValue){
            pendingValue[ASYNC_STATUS] = STATUS_PENDING;
            state[statePropName] = pendingValue
        },
        setError(state, error){
            error[ASYNC_STATUS] = STATUS_ERROR;
            state[statePropName] = error
        },
        setValue(state, value){
            value[ASYNC_STATUS] = STATUS_VALUE;
            state[statePropName] = value
        }
    }
}
