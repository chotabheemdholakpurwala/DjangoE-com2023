import {useEffect} from "react"
import axios from "axios";
export const Logout = () => {
    useEffect(() => {
       (async () => {
         try {
           localStorage.clear();
           axios.defaults.headers.common['Authorization'] = null;
           window.location.href = '/';
          } catch (e) {
             console.log('logout not working', e);
            }
         })();
    }, []);
    return (
       <div></div>
     )
}