import React, { Component } from "react";
import AdForm from "../../Components/AdForm/AdForm";
import IsAuthenticated from "../../hoc/IsAuthenticated";
import AllowEdit from "../../hoc/AllowEdit";
import IsLoaded from "../../hoc/IsLoaded";
import getOneAdById from "../../utils/ads/getOneAdById";

class AdEditPage extends Component {
    state = {
        ad: [],
        isLoading: true,
        allowEdit: false
    }
    componentDidMount() {
        const { id } = this.props.match.params
        getOneAdById.call(this, id)
    }
    render() {
        return (
            <IsAuthenticated userRoles={['admin', 'user']}>
                <IsLoaded isLoaded={!this.state.isLoading}>
                    <AllowEdit adUserID={this.state.ad.userID}>
                        <AdForm
                            action={`/api/ads/edit/${this.state.ad._id}`}
                            ad={this.state.ad}
                            edit={true}
                        />
                    </AllowEdit>
                </IsLoaded>
            </IsAuthenticated>
        )
    }
}

export default AdEditPage