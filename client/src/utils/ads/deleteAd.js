import axios from "axios";
import getAllAds from "./getAllAds";

function deleteAd(e) {
    const id = e.target.dataset.id
    const url = `/api/ads/delete/${id}`
    const config = {
        headers: { 'Authorization': this.props.token }
    }
    axios
        .delete(url, config)
        .then(() => {
            const ads = this.state.ads.concat()
            const updatedAdList = ads.filter(ad => ad._id !== id)
            const pageInfo = { ...this.state.pageInfo }
            pageInfo.totalDocs = pageInfo.totalDocs - 1
            if (updatedAdList.length > 0) {
                this.setState({ ads: updatedAdList, pageInfo })
            } else {
                getAllAds.call(this)
            }
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

export default deleteAd