import React,{ useState, useEffect } from "react";
import { TableView } from "./TableView";

let insertbool = true;
//get data from storage
const getDatafromStorage = () => {
    const data = localStorage.getItem('issueData');
    if (data) {
      return JSON.parse(data);
    } else {
      return []
    }
}

export const IssueCreationPage = () => {
    const [issues, setissues] = useState(getDatafromStorage());
    const [isDisabled, setIsDisabled] = useState(false);

    //button
    const [buttonname, setButtonName] = useState("Verify and submit");

    //for error
    const [errorid, seterrorID] = useState(false);
    const [errortask, seterrorTask] = useState(false);
    const [errorenddate, seterrorEndDate] = useState(false);
    const [errorpriority, seterrorpriority] = useState(false);
    const [errorassignee, seterrorAssignee] = useState(false);
    const [errorstatus, seterrorStatus] = useState(false);

    // input field states
    const [id, setID] = useState('');
    const [task, setTask] = useState('');
    const [enddate, setEndDate] = useState('');
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('');

    // save data
    useEffect(() => {
        localStorage.setItem('issueData',JSON.stringify(issues));
    },[issues])

    let getData;

    // Original data has to shown in the input field when Edit
    const editIssue = (id) => {
        setIsDisabled(!isDisabled); // unique Idfield is disabled..
        console.log("From edit",id)
        setButtonName("Edit here and verify");
        const editable = JSON.parse(localStorage.getItem("issueData"));
        getData = editable.find((total)=>total?.id === id);
        setID(getData?.id);
        setTask(getData?.task);
        setEndDate(getData?.enddate);
        setPriority(getData?.priority);
        setAssignee(getData?.assignee);
        setStatus(getData?.status);
        insertbool = false;
    }

    //deletedata
    const deleteIssue = (id) => {
        let alert = window.confirm("Are you want to delete?");
        console.log("From delete",id)
        if (alert) {
            const filteredIssues = issues.filter((element, index)=>  {
                return element?.id !== id;
            })
            setissues(filteredIssues);
        }
    }

    //submit issue
    const submitIssue = (e) => {
        e.preventDefault();
        if (id?.length === 0) {
            seterrorID(true);
            return;
        }
        seterrorID(false);

        if (task.length === 0) { seterrorTask(true) } else { seterrorTask(false) }
        if (enddate === "") { seterrorEndDate(true) } else { seterrorEndDate(false) }
        if (priority === "") { seterrorpriority(true) } else { seterrorpriority(false) }
        if (assignee === "") { seterrorAssignee(true) } else { seterrorAssignee(false) }
        if (status === "") { seterrorStatus(true) } else { seterrorStatus(false) }

        if (id !== "" && task !== "" && enddate !== "" && priority !== "" && assignee !== "" && status !== "") {
            if (isDisabled) { // revert to normal IdField
                setIsDisabled(!isDisabled);
                setButtonName("Verify and submit");
            }
            let issue = {
                id,
                task,
                enddate,
                priority,
                assignee,
                status
            }

            if (insertbool) {
                const isIdAlreadyExists = issues?.find(issue => issue?.id === id);
                if(isIdAlreadyExists !== undefined && isIdAlreadyExists?.id === id) {
                    alert("ID is already Exists. Check your created issues list to edit or create new issue using different Id.")
                    return;
                }
                setissues([...issues, issue]);
            } else {
                const editable = JSON.parse(localStorage.getItem("issueData"));
                getData = editable.find((total) => total?.id === id);
                getData.id = id;
                getData.task = task;
                getData.enddate = enddate;
                getData.priority = priority;
                getData.assignee = assignee;
                getData.status = status;
                setissues(editable);
            }
                setID('');
                setTask('');
                setEndDate('');
                setPriority('');
                setAssignee('');
                setStatus('');
        }
    }

    return(
        <div>
            <h2 className="title-create" >Issue Creation using CRUD</h2>
            <div className="form-container">
                <form autoComplete="off" className='form-group' onSubmit={submitIssue}>

                    Your ID&emsp;&emsp;&emsp;&emsp;<input type="number" disabled={isDisabled} className='form-control' 
                    onChange={(e)=>setID(e.target.value)} value={id} ></input>
                    {errorid ?
                        <label>Your Id is required*</label>:""
                    }<br></br><br></br>

                    Task&emsp;&emsp;&emsp;&emsp;&emsp;<input type="text" className='form-control' 
                    onChange={(e)=>setTask(e.target.value)} value={task}></input>
                    {errortask?
                    <label>Fill task name*</label>:""
                    }<br></br><br></br>

                    End date:&emsp;&emsp;&emsp;
                    <input id="selectend" type="date" onChange={(e)=>setEndDate(e.target.value)} value={enddate}/>

                    {errorenddate?
                        <label>Select End Date for this issue*</label>:""
                    }<br></br><br></br>


                    Issue priority:&emsp;
                    <select id="selectpriority" onChange={(e)=>setPriority(e.target.value)} value={priority}>
                        <option></option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>Minor</option>
                    </select>
                    {errorpriority?
                        <label>This is require to fill*</label>:""
                    }<br></br><br></br>

                    Assignee:&emsp;&emsp;&emsp;
                    <select id="selectassign" onChange={(e)=>setAssignee(e.target.value)} value={assignee}>
                        <option></option>
                        <option>Name1</option>
                        <option>Name2</option>
                        <option>Name3</option>
                    </select>
                    {errorassignee?
                        <label>Select an assignee for this issue *</label>:""
                    }<br></br><br></br>

                    Issue Status:&emsp;
                    <select id="selectstatus" onChange={(e)=>setStatus(e.target.value)} value={status}>
                        <option></option>
                        <option>OPEN</option>
                        <option>INPROGRESS</option>
                        {!insertbool && <option>CLOSED</option>}
                    </select>
                    {errorstatus?
                        <label>Please select the status*</label>:""
                    }<br></br><br></br>

                    <button type="submit" className='verify-btn-submit'>{buttonname}</button>
                </form>
            </div>

            {/* Issue listed view */}
            <div className="form-view-container">
                <u><h2>CREATED ISSUES</h2></u> 
                {issues.length < 1 && <div className="no-issues">No Issues are Created yet</div>}

                {issues.length > 0 &&
                    <>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ISSUE ID</th>
                                        <th scope="col">TASK NAME</th>
                                        <th scope="col">DUE ON</th>
                                        <th scope="col">PRIORITY</th>
                                        <th scope="col">ASSIGNEE</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">EDIT/DELETE</th>
                                    </tr>
                                    <TableView issues={issues} deleteIssue={deleteIssue} editIssue={editIssue}/>
                                </thead>
                            </table>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
export default IssueCreationPage;