function Alert(msg,type){
    let alertPlaceholder = document.getElementById('alert')
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div data-bs-delay="1" class="alert alert-' + type + ' alert-dismissible" role="alert">' + msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
    return(
        <></>
    );
}
export default Alert;