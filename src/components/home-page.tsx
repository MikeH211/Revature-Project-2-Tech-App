import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import Employee from "../models/employee";
import EmployeeRoutes from "../routes/employee-routes";
import CreateEmployeeForm from "./create-employee-form";
import EmployeeLineItem from "./employee-line-item";


export default function HomePage() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [logout, setLogout] = useState<{}>();

    const instance = useMsal();

    useEffect(()=> {
        (async () => {
            const response = await EmployeeRoutes.getEmployees();
            if(response && response.status === 200) {
                response.data.sort((e1, e2) => {
                    if(e1.isManager === e2.isManager) {
                        return e1.id - e2.id;
                    }
                    return e1.isManager ? 1 : -1;
                })
                setEmployees(response.data);
            }
        })();
    },[])

    useEffect(() => {
        if(!logout) {
            return;
        }
        (async () => {
            await instance.instance.logoutPopup();
        })();
    }, [logout, instance.instance])



    return (<>
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <h1>Triple Threat Vacations Technology Specialist Site </h1>
                </div>
                <div className="col d-flex">
                    <button className="btn lg btn-outline-primary align-self-center" onClick={()=>setLogout({...logout})}>Log Out</button>
                </div>
            </div>
        </div>
        <CreateEmployeeForm />
        <table className="table table-hover">
            <thead>
                <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Manager</th><th>Update Password</th></tr>
            </thead>
            <tbody>
                {employees.map(e => <EmployeeLineItem key={e.id} {...e}/>)}
            </tbody>
        </table>
    </>)
}