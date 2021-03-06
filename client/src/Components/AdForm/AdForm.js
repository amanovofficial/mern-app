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
            ? this.setState({ forStudents: '????' })
            : this.setState({ forStudents: '??????' })
    }
    handleOnChangeRegistration = (e) => {
        e.target.checked
            ? this.setState({ registration: '????' })
            : this.setState({ registration: '??????' })
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
                    <h1 className={classes.Header}>{this.props.edit ? '??????????????????????????' : '?????????? ????????????????????'}</h1>
                    <Alert variant={this.state.alert.variant} text={this.state.alert.text} />
                    <Form>
                        <ImageGallery preview={true} images={toPreview(this.state.images)}
                            handleOnDelete={this.handleOnDeleteNewImage} />

                        <ImageGallery images={this.state.oldImages} handleOnDelete={this.handleOnDeleteOldImage} />
                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>?????????????????? ????????????????????</Form.Label>
                                <Form.File
                                    id="custom-files"
                                    label="?????????????? ?????? ???????????????????? ????????????????????"
                                    custom
                                    multiple
                                    onChange={this.uploadPhoto}
                                />
                            </Col>
                            <Col>
                                <Form.Label>???????????????? ??????????</Form.Label>
                                <Form.Control as="select" value={this.state.region} onChange={this.handleOnChangeRegion}>
                                    {
                                        this.state.regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                                    }
                                </Form.Control>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>????????????????</Form.Label>
                                <Form.Control onChange={this.handleOnChangeRefPoint} value={this.state.refPoint} />
                            </Col>
                            <Col>
                                <Form.Label>???????????????????? ????????????</Form.Label>
                                <Form.Control type="number" onChange={this.handleOnChangeNumberOfRooms} value={this.state.numberOfRooms} />
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>????????</Form.Label>
                                <Form.Control type="number" onChange={this.handleOnChangeFloor} value={this.state.floor} />
                            </Col>
                            <Col>
                                <Form.Label>??????????????????</Form.Label>
                                <Form.Control type="number" onChange={this.handleOnChangeNumberOfStoreys} value={this.state.numberOfStoreys} />
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>????????</Form.Label>
                                <Form.Control type="number" id='cost' onChange={this.handleOnChangeRentCost} value={this.state.rentCost.cost} />
                            </Col>
                            <Col>
                                <Form.Label>????????????</Form.Label>
                                <Form.Control as="select" id='currency' value={this.state.rentCost.currency} onChange={this.handleOnChangeRentCost}>
                                    <option value="??.??">??.??</option>
                                    <option value="??????">??????</option>
                                </Form.Control>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>?????? ???????????????????? ????????????</Form.Label>
                                <Form.Control id="rooms" as="select" value={this.state.typeOfLayout.rooms} onChange={this.handleOnChangeTypeOfLayout}>
                                    <option value="????????????????????">????????????????????</option>
                                    <option value="??????????????">??????????????</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>?????? ???????????????????? ??????????????</Form.Label>
                                <Form.Control id="lavatory" as="select" value={this.state.typeOfLayout.lavatory} onChange={this.handleOnChangeTypeOfLayout}>
                                    <option value="????????????????????">????????????????????</option>
                                    <option value="??????????????">??????????????</option>
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
                                            label="?????????????? ?? ??????????????????"
                                            checked={this.state.forStudents === '????'}
                                            onChange={this.handleOnChangeForStudents}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>????????????????</Form.Label>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.internet === "????????"}
                                            id="internet" inline label="????????????????"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.conditioner === "????????"}
                                            id="conditioner" inline label="??????????????????????"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.tv === "????????"}
                                            id="tv" inline label="??????????????????"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.furniture === "????????"}
                                            id="furniture" inline label="????????????"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.washMachine === "????????"}
                                            id="washMachine" inline label="???????????????????? ????????????"
                                            onChange={this.handleOnChangeFacilities} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            checked={this.state.facilities.microwaveOven === "????????"}
                                            id="microwaveOven" inline label="??????????????????????????"
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
                                        label="?????????????????? ????????????????"
                                        checked={this.state.registration === "????"}
                                        onChange={this.handleOnChangeRegistration}
                                    />
                                }
                            </Col>
                        </Row>

                        <Row className={classes.Row}>
                            <Col>
                                <Form.Label>???????????????????????????? ????????????????????</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="???????????? ???????????????????????????? ???????????????????? ?? ????????????????"
                                    onChange={this.handleOnChangeAdditionalInfo}
                                    value={this.state.additionalInfo ? this.state.additionalInfo : ''}
                                />
                            </Col>
                        </Row>
                        <button onClick={this.handleOnSubmit} className={classes.button} type='button'>
                            {this.props.edit ? '????????????????' : '??????????????'}
                        </button>
                    </Form>
                </Container>
                : <Redirect to={`/ads/${this.state.id}`} />
        )
    }
}

export default AdForm