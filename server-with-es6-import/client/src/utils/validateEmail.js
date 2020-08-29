const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    emails = emails.replace(/\s+/g, '');
    const invalidEmails = emails
        .split(',')
        .filter((email) => EMAIL_REGEX.test(email) === false);
    // Remove trailing comma
    invalidEmails.forEach((email) => {
        if (email === '') {
            invalidEmails.splice(invalidEmails.indexOf(email), 1);
        }
    });
    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    return;
};
