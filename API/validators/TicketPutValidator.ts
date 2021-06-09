export function validateBodyPutTicket(body: any) {
    let newBody: any = {};
    if(body.status)
        newBody.status = body.status;
    if(body.assignee)
        newBody.assignee = body.assignee;
    if(body.tag)
        newBody.tag = body.tag;
    return newBody;
}