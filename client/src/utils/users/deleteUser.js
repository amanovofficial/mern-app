import axios from "axios";
import { getRequestHeaders } from "../../store/actions/authActions";
import getUsers from "./getUsers";
import { showAlert, clearAlert } from "../alerts/alert";
function deleteUser(e) {
    const userID = e.target.dataset.id
    const url = `/api/users/${userID}`
    const config = getRequestHeaders(this.props.token)
    axios
        .delete(url, config)
        .then(res => {
            const users = this.state.users.concat()
            const updatedUsersList = users.filter(user => user._id !== userID)
            const pageInfo = { ...this.state.pageInfo }
            pageInfo.totalDocs = pageInfo.totalDocs - 1
            if (updatedUsersList.length > 0) {
                this.setState({ users: updatedUsersList })
                this.setState({ users: updatedUsersList, pageInfo })
            } else {
                getUsers.call(this)
            }
        }).catch(err => {
            const text = err.response ? err.response.data.message : err.message
            showAlert.call(this, 'danger', text)
            clearAlert.call(this, 3)
        })
}

export default deleteUser