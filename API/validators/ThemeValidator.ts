export function validateTheme(body: any) {
    let newBody: any = {};
    if(body.primarycolor)
        newBody["Theme.primarycolor"] = body.primarycolor
    if(body.secondarycolor)
        newBody["Theme.secondarycolor"] = body.secondarycolor;
    return newBody;
}