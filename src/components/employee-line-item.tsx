import { useEffect, useRef, useState } from "react";
import Employee from "../models/employee";
import EmployeeRoutes from "../routes/employee-routes";


export default function EmployeeLineItem(props:Employee) {

    const {id, fname, lname, username, isManager} = props;
    const [update, setUpdate] = useState<{}>();
    const passInput = useRef<HTMLInputElement>(null);
    const confirmPassInput = useRef<HTMLInputElement>(null);

    useEffect( () => {
        if(!update) {
            return
        }
        const password = passInput.current?.value;
        if(!password) {
            alert("No password entered.");
            return;
        } else if(password !== confirmPassInput.current?.value) {
            alert("Passwords do not match.");
            return;
        } else {
            (async () => {
                const response = await EmployeeRoutes.updateEmployee(id, password);
                if(response && response.status === 200) {
                    alert(`Successfully updated password for employee id: ${id}.`);
                } else {
                    alert(response?.data + "\n Error while updating.");
                }
            })();
            passInput.current.value = "";
            confirmPassInput.current.value = "";
        }
    },[update, id]);

    return(<tr className="table-warning">
        <td>{id}</td>
        <td>{fname}</td>
        <td>{lname}</td>
        <td>{username}</td>
        <td>{isManager ? "YES" : "NO"}</td>
        <td>
            <input className="" placeholder="New Password" type="password" ref={passInput} />
            <input className="mx-2" placeholder="Confirm Password" type="password" ref={confirmPassInput} />
            <button className="btn btn-warning" onClick={()=>setUpdate({...update})}>Update Password</button>
        </td>
    </tr>)
}