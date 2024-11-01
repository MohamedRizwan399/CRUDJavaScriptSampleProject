import React from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    //for navigate
    let navigateToIssueCreationPage = useNavigate();

    function createIssue() {
        navigateToIssueCreationPage('/issuecreate')
    }

 
    return(
        
        <div className="issues-table">
            <table id="issueList" >
                <thead>
                    <tr><th>DASHBOARD LIST</th></tr>
                    <tr>
                        <th scope="col">Issue Name</th> &emsp; &emsp; &emsp; &emsp; &emsp; 
                        <th scope="col">Assignee&emsp;&emsp;</th> &emsp; &emsp; &emsp; &emsp; &emsp; 
                        <th scope="col">Created On&emsp;&emsp;</th> &emsp; &emsp; &emsp; &emsp; &emsp; 
                        <th scope="col">Status&emsp;&emsp;</th> &emsp; &emsp; &emsp; &emsp; &emsp; 
                        <th scope="col">Actions</th>&emsp;&emsp; &emsp; &emsp; &emsp;
                    </tr>
                </thead>
                <tbody id="tablebody">
                </tbody>
            </table>
            <button className="issue-btn" onClick={createIssue}>+ CREATE ISSUE</button>
        </div>    
 
    )
}

export default Dashboard;