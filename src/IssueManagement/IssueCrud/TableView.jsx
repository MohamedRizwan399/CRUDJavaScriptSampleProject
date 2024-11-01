import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {edit} from 'react-icons-kit/feather/edit'


export const TableView = ({issues, deleteIssue, editIssue}) => {
  return issues.map(issue=>(
    <tr key={issue.id}>
        <td> {issue.id} </td>
        <td> {issue.task} </td>
        <td> {issue.enddate} </td>
        <td> {issue.priority} </td>
        <td> {issue.assignee} </td>
        <td> {issue.status} </td>
        <td className='edit-btn' onClick={()=>editIssue(issue.id)}>
            <Icon icon={edit}/>&emsp;&emsp;
            <span className='delete-btn' onClick={()=>deleteIssue(issue.id)}>
                <Icon icon={trash}/>
            </span>
        </td>
        
        
    </tr>
  ))
}
