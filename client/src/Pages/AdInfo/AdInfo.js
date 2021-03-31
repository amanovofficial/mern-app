import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Container } from "react-bootstrap";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header/Header";
import Slider from "../../Components/Slider";
import ShowChildren from "../../hoc/ShowChildren";
import classes from "./AdInfo.module.css";
import toStandartDate from "../../utils/toStandartDate"
import { showAlert, clearAlert } from "../../utils/alerts/alert"
import getOneAdById from "../../utils/ads/getOneAdById"
import { getRequestHeaders } from "../../store/actions/authActions";
import Loader from "../../Components/Loader/Loader";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";

class AdInfo extends Component {
    state = {
        ad: {},
        adAuthor: null,
        isLoading: true,
        rejectionMsg: '',
        publish: false,
        alert:{
            variant:'',
            text:''
        },
        error: null
    }

    componentDidMount() {
        const { id } = this.props.match.params
        getOneAdById.call(this, id)
    }

    handleOnClickShowContacts = () => {
        const url = `/api/ads/adAuthor/${this.state.ad.userID}`
        axios
            .get(url)
            .then(({ data }) => {
                this.setState({ adAuthor: data.adAuthor })
            })
            .catch(err => {
                const text = err.response ? err.response.data.message : err.message
                showAlert.call(this, 'danger', text)
                clearAlert.call(this, 3)
            })
    }

    handleOnPublish = () => {
        const body = JSON.stringify({ published: true })
        const config = getRequestHeaders(this.props.token)
        const url = `/api/ads/publishOrIgnore/${this.state.ad._id}`
        axios
            .put(url, body, config)
            .then(({ data }) => {
                this.setState({ ad: data.ad })
                showAlert.call(this, 'success', 'Объявление успешно опубликовано!')
                clearAlert.call(this, 2)
            })
            .catch(err => {
                const text = err.response ? err.response.data.message : err.message
                showAlert.call(this, 'danger', text)
                clearAlert.call(this, 3)
            })
    }

    handleOnIgnore = () => {
        const rejectionMsg = prompt('Напишите причину блокирования', '')
        if (rejectionMsg === null) return
        const body = JSON.stringify({ rejectionMsg, published: false })
        const config = getRequestHeaders(this.props.token)
        const url = `/api/ads/publishOrIgnore/${this.state.ad._id}`
        axios
            .put(url, body, config)
            .then(({ data }) => {
                this.setState({ ad: data.ad })
                showAlert.call(this, 'success', 'Объявление успешно заблокировано!')
                clearAlert.call(this, 2)
            })
            .catch(err => {
                const text = err.response ? err.response.data.message : err.message
                showAlert.call(this, 'danger', text)
                clearAlert.call(this, 3)
            })
    }
    render() {
        const { user } = this.props
        const isAdAuthorOrAdmin = (user.id === this.state.ad.userID) || (user.role === 'admin')
        return (
            !this.state.error
                ? (!this.state.isLoading
                    ? <Container>
                        <Header>{this.state.ad.numberOfRooms}-комн. квартира, {this.state.ad.region}</Header>
                        <Alert variant={this.state.alert.variant} text={this.state.alert.text} />
                        <ShowChildren condition={isAdAuthorOrAdmin}>
                            <Alert variant='danger' text={this.state.ad.rejectionMsg} />
                        </ShowChildren>
                        <Slider images={this.state.ad.images} />

                        <div className={classes.InfoBox}>
                            <ul>
                                <li><strong>Добавлено в:</strong> {toStandartDate(this.state.ad.date)}</li>
                                <li><strong>Цена:</strong> {this.state.ad.rentCost.cost} {this.state.ad.rentCost.currency}</li>
                                <li><strong>Район:</strong> {this.state.ad.region}</li>
                                <li><strong>Ориентир:</strong> {this.state.ad.refPoint}</li>
                                <li><strong>Количество комнат:</strong> {this.state.ad.numberOfRooms}</li>
                                <li><strong>Этаж:</strong> {this.state.ad.floor}</li>
                                <li><strong>Этажность:</strong> {this.state.ad.numberOfStoreys}</li>
                                <hr />

                                <li><strong>Удобства</strong></li>
                                <hr />
                                <li><strong>Кондиционер:</strong> {this.state.ad.facilities.conditioner}</li>
                                <li><strong>Стиральная машина:</strong> {this.state.ad.facilities.washMachine}</li>
                                <li><strong>Интернет:</strong> {this.state.ad.facilities.internet}</li>
                                <li><strong>Мебель:</strong> {this.state.ad.facilities.furniture}</li>
                                <li><strong>Телевизор:</strong> {this.state.ad.facilities.tv}</li>
                                <li><strong>Микроволновка:</strong> {this.state.ad.facilities.microwaveOven}</li>
                                <hr />
                                <li><strong>Тип планировки комнат:</strong> {this.state.ad.typeOfLayout.rooms}</li>
                                <li><strong>Тип планировки санузла:</strong> {this.state.ad.typeOfLayout.lavatory}</li>
                                <li><strong>Сдаётся студентам:</strong> {this.state.ad.forStudents}</li>
                                <li><strong>Временная прописка:</strong> {this.state.ad.registration}</li>
                                <li><strong>Допольнительная информация:</strong> {this.state.ad.additionalInfo}</li>
                                {
                                    this.state.adAuthor
                                        ? <>
                                            <li><strong>Имя:</strong> {this.state.adAuthor.name}</li>
                                            <li><strong>Номер телефона:</strong>{this.state.adAuthor.phoneNumber}</li>
                                        </>
                                        : <li>
                                            <strong>Контакты:</strong>
                                            <span
                                                onClick={this.handleOnClickShowContacts}
                                                className={classes.showContacts}
                                            >
                                                Показать
                                        </span>
                                        </li>
                                }


                            </ul>
                            <ShowChildren condition={user.role === 'admin'}>
                                <div className={classes.buttons}>
                                    {
                                        !this.state.ad.published
                                            ? <button onClick={this.handleOnPublish} className={classes.button}>Опубликовать</button>
                                            : <button onClick={this.handleOnIgnore} className={classes.button}>Блокировать</button>
                                    }
                                </div>
                            </ShowChildren>
                        </div>
                    </Container>
                    : <Loader />)
                :<ErrorPage text={this.state.error} />
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(AdInfo)