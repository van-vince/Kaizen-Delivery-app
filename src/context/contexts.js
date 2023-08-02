import React, {createContext, useReducer, useState} from 'react';
import {OriginReducer, DestinationReducer, TravelTimeReducer} from  '../reducers/reducers'


export const OriginContext = createContext()
export const DestinationContext = createContext()
export const TravelTimeContext = createContext()
// export const AuthContext = createContext()



export const OriginContextProvider = (props)=>{
    const[origin,dispatchOrigin] = useReducer(OriginReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <OriginContext.Provider
                value ={{origin, dispatchOrigin}}
            >
            {props.children}
        </OriginContext.Provider>
    )
}

export const DestinationContextProvider = (props)=>{
    const[destination, dispatchDestination] = useReducer(DestinationReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <DestinationContext.Provider
                value ={{destination, dispatchDestination}}
            >
            {props.children}
        </DestinationContext.Provider>
    )
}

export const TravelTimeContextProvider = (props)=>{
    const[travelTime, dispatchTravelTime] = useReducer(TravelTimeReducer,{
                distance: null,
                duration: null
    })
    return(
        <TravelTimeContext.Provider
                value ={{travelTime, dispatchTravelTime}}
            >
            {props.children}
        </TravelTimeContext.Provider>
    )
}

// export const AuthContextProvider = (props) => {

//     const[isLoading, setIsLoading] = useState(true)
//     const[userToken, setUserToken] = useState(null)
//     const[text, setText] = useState('text value')

//     const login = ()=>{
//         setIsLoading(false)
//         setUserToken('kaizen')
//     }

//     const logout = ()=>{
//         setIsLoading(false)
//         setUserToken(null)
//     }

//     return (
//         <AuthContext.Provider
//             value={{login, logout, text}}
//         >
//              {props.children}
//         </AuthContext.Provider>
//     )
// }