import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableView } from "../IssueCrud/TableView";


function Dashboard() {
    //for navigate
    let navigateToIssueCreationPage = useNavigate();
    const [getIssues, setCreatedIssues] = useState([]);

    function createIssue() {
        navigateToIssueCreationPage('/issuecreate')
    }

    useEffect(() => {
        let getCreatedIssues = JSON.parse(localStorage.getItem("issueData"));
        setCreatedIssues(getCreatedIssues);
    }, [])

    //deletedata
    const deleteIssue=(id) => {
        let alert = window.confirm(`Are you sure to delete this '${id}' issue?`)
        console.log("From delete",id)
        if (alert) {
            const filteredIssues = getIssues.filter((element, index)=>  {
                return element.id !== id;
            })
            setCreatedIssues(filteredIssues);
            localStorage.setItem('issueData', JSON.stringify(filteredIssues));
        }
    }
 
    return(
        
        <div className="issues-table">
            <>
                {getIssues?.length > 0 && <div className="title-dashboard">Created Issues List here:</div>}

                {getIssues?.length > 0 && 
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
                                    <th scope="col">DELETE</th>
                                </tr>
                            </thead>
                            <tbody id="tablebody">
                                <TableView issues={getIssues} deleteIssue={deleteIssue}/>
                            </tbody>
                        </table>
                    </div>
                }

                {getIssues?.length < 1 && <div className="no-issues">No Issues are Created yet</div>}
                <button className="issue-btn" onClick={createIssue}>+ CREATE NEW ISSUE</button>
            </>
        </div>    
 
    )
}

export default Dashboard;