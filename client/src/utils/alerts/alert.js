export function showAlert(variant, text) {
    const alert = { variant, text }
    this.setState({ alert })
}

export function clearAlert(timeout) {//timeout(s)
    const alert = { variant: '', text: '' }
    setTimeout(() => {
        this.setState({ alert })
    }, timeout*1000); 
}