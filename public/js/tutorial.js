function loadedmd() {
    return new Promise((resolve, reject) => {
        const markdownBody =$($('zero-md')[0].shadowRoot).find('.markdown-body');
        if (markdownBody !== undefined)
            resolve(true);
    });
}

export {loadedmd}