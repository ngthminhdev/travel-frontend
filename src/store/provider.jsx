import StoreContext from "./store.context";
import {useReducer} from "react"
import reducer, {initState} from "./reducer";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Provider({children}) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            <>
                <div style={{minHeight: '80vh'}}>
                    {children}
                </div>
            </>
        </StoreContext.Provider>
    )
}

export default Provider;