function createObjectURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
}

function output(url, params, name) {
    let query = ''
    if (params && Object.keys(params).length > 0) {
        let keys = Object.keys(params);
        let arr = [];
        keys.map(item => {
            arr.push(`${item}=${params[item]}`)
        })
        query = arr.join('&')
    }
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('get', `${url}?${query}`); 
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status == 200) {
            let blob = this.response;
            let filename = `${name}.xlsx`; 
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                let a = document.createElement('a');
                let url = createObjectURL(blob);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }

        }
    };
    xhr.send(formData);
}

export {
    output
};