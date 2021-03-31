import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Filter from "../Components/Filter/Filter";
import Ad from "../Components/Ad/Ad";
import Pagination from "../Components/Pagination/Pagination";
import Loader from "../Components/Loader/Loader";
import IsLoaded from "../hoc/IsLoaded";
import toStandartDate from "../utils/toStandartDate";
import getAllAds from "../utils/ads/getAllAds";
import deleteAd from "../utils/ads/deleteAd";
import IsAuthenticated from "../hoc/IsAuthenticated";
import ShowChildren from "../hoc/ShowChildren";

class MyAds extends Component {

    state = {
        ads: [],
        pageInfo: {},
        query: null,
        isLoading: true,
        isLoadingAds: false,
        url: '/api/ads/my',
        alert: {
            variant: '',
            text: ''
        }
    }

    componentDidMount() {
        getAllAds.call(this)
    }

    render() {
        return (
            <IsAuthenticated userRoles={['user']}>
                <IsLoaded isLoaded={!this.state.isLoading}>
                    <Container style={{ width: '70%' }}>
                        <Filter search={getAllAds.bind(this)} />
                        <ShowChildren condition={!this.props.isFilterChanged}>
                            {
                                !this.state.isLoadingAds
                                    ? <>
                                        <p>Всего ({this.state.pageInfo.totalDocs})</p>
                                        {
                                            this.state.ads.map((item, index) => (
                                                <Ad
                                                    key={index}
                                                    id={item._id}
                                                    published={item.published}
                                                    header={`${item.region} ${item.refPoint} ${item.numberOfRooms} / ${item.floor} / ${item.numberOfStoreys}`}
                                                    price={`${item.rentCost.cost} ${item.rentCost.currency}`}
                                                    date={toStandartDate(item.date)}
                                                    link={`/ads/${item._id}`}
                                                    editLink={`/edit-ad/${item._id}`}
                                                    showButtons={true}
                                                    onDelete={deleteAd.bind(this)} />
                                            )
                                            )
                                        }
                                        <Pagination pageInfo={this.state.pageInfo} getAllElements={getAllAds.bind(this)} />
                                    </>
                                    : <Loader />
                            }
                        </ShowChildren>
                    </Container>
                </IsLoaded>
            </IsAuthenticated>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token,
    query: state.filter.query,
    isFilterChanged: state.filter.changed
})

export default connect(mapStateToProps)(MyAds)