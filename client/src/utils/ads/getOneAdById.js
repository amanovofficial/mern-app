import axios from "axios";

function getOneAdById(id) {
    axios
        .get(`/api/ads/${id}`)
        .then(({ data }) => {
            this.setState({
                ad: data.ad,
                isLoading: false
            })
        })
        .catch(err => {
            const text = err.response ? err.response.data.message : err.message
            this.setState({error:text})
        })
}

export default getOneAdById