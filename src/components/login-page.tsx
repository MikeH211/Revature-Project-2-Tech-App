import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import logo from '../images/travel_logo2.png';

export default function LoginPage() {

    const instance = useMsal();    

    const [login, setLogin] = useState<{}>();

    useEffect(() => {
        if(!login) {
            return;
        }
        (async ()=> {
            await instance.instance.loginPopup();
        })()
    },[login, instance.instance]);

    return (<>
        <div className='d-flex flex-column align-items-center'>
            <h1>Triple Threat Vacations Technology Specialist Site </h1>
            <button className="btn btn-lg btn-primary w-25" title='Login' onClick={()=> setLogin({...login})}>Login</button>
            <img className='img-fluid' alt='Triple Threat Logo' src={logo}/>
        </div>
    </>)
}