import axios from "axios";
import { getRequestHeaders } from "../../store/actions/authActions";
import { showAlert, clearAlert } from "../alerts/alert";
function getUsers(pageNumber = null) {

    this.setState({ isLoadingUsers: true })
    
    if (pageNumber === null) {
        pageNumber = 1
    }
    let url = `/api/users?page=${pageNumber}`
    if (this.props.query) {
        url += this.props.query
    }
    const config = getRequestHeaders(this.props.token)
    axios.get(url, config)
        .then(res => {
            const update = {
                users: res.data.users,
                pageInfo: res.data.pageInfo,
                isLoading: false,
                isLoadingUsers: false
            }
            this.setState(update)
        })
        .catch(err => {
            const text = err.response ? err.response.data.message : err.message
            showAlert.call(this, 'danger', text)
            clearAlert.call(this, 3)
            console.log(err);
        })
}

export default getUsers