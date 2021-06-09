export function validateTheme(body: any) {
    let newBody: any = {};
    if(body.primarycolor)
        newBody.primarycolor = body.primarycolor
    if(body.secondarycolor)
        newBody.secondarycolor = body.secondarycolor;
    return newBody;
}