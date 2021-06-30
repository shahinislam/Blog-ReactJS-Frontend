import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Protected = (props) => {
    const Component = props.Component;
    const history = useHistory();

    useEffect(() => {
        if( ! localStorage.getItem('user-info'))
        {
            history.push('/login');
        }
    }, [])

    return (  
        <div className="protected">
            <Component />
        </div>
    );
}
 
export default Protected;