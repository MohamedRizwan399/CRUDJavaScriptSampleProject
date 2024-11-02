export const getIssueLists = () => {
    if (!localStorage["issues"]) {
      localStorage["issues"] = "[]";
    }
  
    let issues = localStorage["issues"];
    issues = JSON.parse(issues);
    return issues;
  };
  
  export const addIssue = (newIssue) => {
    const issues = getIssueLists();
    issues.push(newIssue);
    localStorage["issues"] = JSON.stringify(issues);
  };
  
  export const removeIssue = (id) => {
    let issues = getIssueLists();
    issues = issues.filter((filterIssue) => filterIssue?.id !== id);
    localStorage["issues"] = JSON.stringify(issues);
  };
  
  export const getIssueById = (id) => {
    const issues = getIssueLists();
    const findedIssue = issues.find((findIssue) => findIssue?.id === id);
    return findedIssue;
  };
  
  export const editIssue = (id, newIssue) => {
    let issues = getIssueLists();
    issues = issues.filter((filterIssue) => filterIssue?.id !== id);
    issues.push(newIssue);
    localStorage["issues"] = JSON.stringify(issues);
  };