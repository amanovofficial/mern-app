import React, { Component } from "react";
import { Redirect } from "react-router";
import { Form, Container, Row, Col } from "react-bootstrap";
import ImageGallery from "../imageGallery/imageGallery";
import toPreview from "../../utils/ads/AdForm/toPreview";
import Alert from "../Alert";
import adStateCreator from "../../utils/ads/AdForm/adStateCreator";
import classes from "./AdForm.module.css";
import createOrUpdateAd from "../../utils/ads/AdForm/createOrUpdateAd";
import setFacilitiesItem from "../../utils/ads/AdForm/setFaciliesItem";

class AdForm extends Component {
    state = adStateCreator()
    componentDidMount() {
        if (this.props.ad) {
            this.setState(adStateCreator(this.props.ad))
        }
    }
    uploadPhoto = (event) => {
        const images = this.state.images.concat()
        images.push(...event.target.files);
        this.setState({ images })
    }
    handleOnDeleteOldImage = (e) => {
        const { filename } = e.target.dataset
        const deletedImages = this.state.deletedImages.concat()
        deletedImages.push(filename)
        const updatedOldImages = this.state.oldImages.filter(file => file !== filename)
        this.setState({
            oldImages: updatedOldImages,
            deletedImages
        })
    }

    handleOnDeleteNewImage = (e) => {
        const { filename } = e.target.dataset
        const updatedNewImages = this.state.images.filter(file => file.name !== filename)
        this.setState({ images: updatedNewImages })
    }
    handleOnChangeRegion = (e) => { this.setState({ region: e.target.value }) }
    handleOnChangeRefPoint = (e) => { this.setState({ refPoint: e.target.value }) }
    handleOnChangeNumberOfRooms = (e) => { this.setState({ numberOfRooms: e.target.value }) }
    handleOnChangeFloor = (e) => { this.setState({ floor: e.target.value }) }
    handleOnChangeNumberOfStoreys = (e) => { this.setState({ numberOfStoreys: e.target.value }) }
    handleOnChangeRentCost = (e) => {
        const rentCost = { ...this.state.rentCost }
        if (e.target.id === 'cost') rentCost.cost = e.target.value
        if (e.target.id === 'currency') rentCost.currency = e.target.value
        this.setState({ rentCost })
    }
    handleOnChangeTypeOfLayout = (e) => {
        const typeOfLayout = { ...this.state.typeOfLayout }
        if (e.target.id === 'rooms') typeOfLayout.rooms = e.target.value
        if (e.target.id === 'lavatory') typeOfLayout.lavatory = e.target.value
        this.setState({ typeOfLayout })
    }
    handleOnChangeForStudents = (e) => {
        e.target.checked
            ? this.setState({ forStudents: 'да' })
            : this.setState({ forStudents: 'нет' })
    }
    handleOnChangeRegistration = (e) => {
        e.target.checked
            ? this.setState({ registration: 'да' })
            : this.setState({ registration: 'нет' })
    }
    handleOnChangeFacilities = (e) => {
        const facilities = setFacilitiesItem.call(this, e)
        this.setState({ facilities })
    }
    handleOnChangeAdditionalInfo = (e) => {
        this.setState({ additionalInfo: e.target.value })
    }

    handleOnSubmit = () => {
        createOrUpdateAd.call(this)
    }
    render() {
        return (
            !this.state.isCreatedOrUpdated
                ? <Container className={classes.Container}>
                    <h1 className={classes.Header}>{this.props.edit ? 'Редактировать' : 'Новое объявление'}</h1>
                    <Alert variant={this.state.alert.variant} text={this.state.alert.text} />
                    <Form>
                        <ImageGallery preview={true} images={toPreview(this.state.images)}
                            handleOnDelete={this.handleOnDeleteNewImage} />

                        <ImageGallery images={this.state.oldImages} handleOnDelete={this.handleOnDeleteOldImage} />
                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Загрузите фотографии</Form.Label>
                                <Form.File
                                    id="custom-files"
                                    label="Нажмите для добавление фотографии"
                                    custom
                                    multiple
                                    onChange={this.uploadPhoto}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Выберите район</Form.Label>
                                <Form.Control as="select" value={this.state.region} onChange={this.handleOnChangeRegion}>
                                    {
                                        this.state.regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                                    }
                                </Form.Control>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Ориентир</Form.Label>
                                <Form.Control onChange={this.handleOnChangeRefPoint} value={this.state.refPoint} />
                            </Col>
                            <Col>
                                <Form.Label>Количество комнат</Form.Label>
                                <Form.Control type="number" onChange={this.handleOnChangeNumberOfRooms} value={this.state.numberOfRooms} />
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Этаж</Form.Label>
                                <Form.Control type="number" onChange={this.handleOnChangeFloor} value={this.state.floor} />
                            </Col>
                            <Col>
                                <Form.Label>Этажность</Form.Label>
                                <Form.Control type="number" onChange={this.handleOnChangeNumberOfStoreys} value={this.state.numberOfStoreys} />
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Цена</Form.Label>
                                <Form.Control type="number" id='cost' onChange={this.handleOnChangeRentCost} value={this.state.rentCost.cost} />
                            </Col>
                            <Col>
                                <Form.Label>Валюта</Form.Label>
                                <Form.Control as="select" id='currency' value={this.state.rentCost.currency} onChange={this.handleOnChangeRentCost}>
                                    <option value="у.е">у.е</option>
                                    <option value="сум">сум</option>
                                </Form.Control>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Тип планировки комнат</Form.Label>
                                <Form.Control id="rooms" as="select" value={this.state.typeOfLayout.rooms} onChange={this.handleOnChangeTypeOfLayout}>
                                    <option value="Раздельный">Раздельный</option>
                                    <option value="Смежный">Смежный</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Тип планировки санузла</Form.Label>
                                <Form.Control id="lavatory" as="select" value={this.state.typeOfLayout.lavatory} onChange={this.handleOnChangeTypeOfLayout}>
                                    <option value="Раздельный">Раздельный</option>
                                    <option value="Смежный">Смежный</option>
                                </Form.Control>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            id="forStudents"
                                            inline
                                            label="Сдаётся и студентам"
                                            checked={this.state.forStudents === 'да'}
                                            onChange={this.handleOnChangeForStudents}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Удобства</Form.Label>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.internet === "есть"}
                                            id="internet" inline label="Интернет"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.conditioner === "есть"}
                                            id="conditioner" inline label="Кондиционер"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.tv === "есть"}
                                            id="tv" inline label="Телевизор"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.furniture === "есть"}
                                            id="furniture" inline label="Мебель"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.washMachine === "есть"}
                                            id="washMachine" inline label="Стиральная машина"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.microwaveOven === "есть"}
                                            id="microwaveOven" inline label="Микроволновка"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={classes.Row}>
                            <Col>
                                {

                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Временная прописка"
                                        checked={this.state.registration === "да"}
                                        onChange={this.handleOnChangeRegistration}
                                    />
                                }
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>Дополнительная информация</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Пишите дополнительную информацию о квартире"
                                    onChange={this.handleOnChangeAdditionalInfo}
                                    value={this.state.additionalInfo ? this.state.additionalInfo : ''}
                                />
                            </Col>
                        </Row>
                        <button onClick={this.handleOnSubmit} className={classes.button} type='button'>
                            {this.props.edit ? 'Обновить' : 'Создать'}
                        </button>
                    </Form>
                </Container>
                : <Redirect to={`/ads/${this.state.id}`} />
        )
    }
}

export default AdForm