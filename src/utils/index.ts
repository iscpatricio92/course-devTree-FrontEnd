export const classNames=(...classes: string[])=> {
    return classes.filter(Boolean).join(' ')
}

export const isValidUrl = (url:string) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}