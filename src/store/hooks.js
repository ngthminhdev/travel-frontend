import StoreContext from "./store.context";
import {useContext} from "react";

export const useStore = () =>  useContext(StoreContext);