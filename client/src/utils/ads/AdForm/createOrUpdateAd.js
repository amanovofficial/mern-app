import axios from "axios";
import createFormData from "./createFormData";
import { showAlert, clearAlert } from "../../alerts/alert";

function createOrUpdateAd() {
    const formData = createFormData.call(this)
    let method = ''
    this.props.edit ? method = 'put' : method = 'post'
    axios({
        method: method,
        url: this.props.action,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
        },
        data: formData
    }).then(({ data }) => {
        this.setState({
            isCreatedOrUpdated: true,
            id: data.id
        })
    }).catch(err => {
        const text = err.response ? err.response.data.message : err.message
        showAlert.call(this, 'danger', text)
        clearAlert.call(this, 3)
        console.log(err);
    })
}

export default createOrUpdateAd