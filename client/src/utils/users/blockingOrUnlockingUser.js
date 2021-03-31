import { getRequestHeaders } from "../../store/actions/authActions"

function blockingOrUnlockingUser() {
    const id = e.target.dataset.id
    const url = `/api/users/blockingOrUnlocking/${id}`
    const config = getRequestHeaders(this.props.token)
    axios
        .put(url, config)
        .then(res => {
            const user = res.data.user
            this.setState({ user })
        }).catch(err => {
            const text = err.response ? err.response.data.message : err.message
            this.setState({
                alert: {
                    variant: 'danger',
                    text
                }
            })
        })
}
export default blockingOrUnlockingUser
