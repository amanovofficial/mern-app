import React, { Component } from "react";
import classes from "./Filter.module.css";
import { connect } from "react-redux";
import { setQuery, queryUsed, clearQuery } from "../../store/actions/filterActions";
const createState = () => ({
    published: false,
    numberOfRooms: [],
    adress: null,
    refPoint: null,
    facilities: {},
    forStudents: null,
    isFilterChanged: false
})
class Filter extends Component {

    state = createState()

    componentDidMount() {
        this.props.clearQuery()
    }

    componentDidUpdate() {
        if (this.state.isFilterChanged) {
            let query = []
            if (this.props.user.role === 'admin' && this.state.published) {
                query.push('&published=true')
            }
            if (this.state.numberOfRooms.length > 0) {
                query.push(`&numberOfRooms=${JSON.stringify(this.state.numberOfRooms)}`)
            }
            if (this.state.adress) {
                query.push(`&adress=${this.state.adress}`)
            }

            if (Object.keys(this.state.facilities).length > 0) {
                query.push(`&facilities=${JSON.stringify(this.state.facilities)}`)
            }

            if (this.state.forStudents) {
                query.push(`&forStudents=true`)
            }
            if (this.state.userID) {
                query.push(`&userID=${this.state.userID}`)
            }
            if (query.length > 0) {
                query = query.join('')
            } else {
                query = null
            }
            this.props.setQuery(query)
        }
    }

    handleOnChangePublished = (e) => {
        if (e.target.checked) {
            this.setState({ published: true, isFilterChanged: true })
        } else {
            this.setState({ published: false, isFilterChanged: true })
        }
    }

    handleOnChangeNumberOfRooms = (e) => {
        let numberOfRooms = [...this.state.numberOfRooms]
        if (e.target.checked) {
            numberOfRooms.push(e.target.id)
        } else {
            numberOfRooms = numberOfRooms.filter(element => element !== e.target.id)
        }
        if (numberOfRooms.length < 1) numberOfRooms = []
        this.setState({ numberOfRooms, isFilterChanged: true })
    }

    handleOnChangeAdress = (e) => {
        let adress = e.target.value.length > 0 ? e.target.value : null
        this.setState({ adress, isFilterChanged: true })
    }

    handleOnChangeRefPoint = (e) => {
        let refPoint = e.target.value.length > 0 ? e.target.value : null
        this.setState({ refPoint, isFilterChanged: true })
    }

    handleOnChangeFacilities = (e) => {
        let facilities = { ...this.state.facilities }
        if (e.target.checked) {
            facilities[e.target.id] = '????????'
        } else {
            delete facilities[e.target.id]
        }
        if (Object.keys(facilities).length < 1) facilities = {}
        this.setState({ facilities, isFilterChanged: true })
    }

    handleOnChangeForStudents = (e) => {
        if (e.target.checked) {
            this.setState({ forStudents: '????', isFilterChanged: true })
        } else {
            this.setState({ forStudents: null, isFilterChanged: true })
        }
    }
    handleOnClickSearch = () => {
        this.setState({ isFilterChanged: false })
        this.props.search()
        // ???????? ???? ?????????????? ?????????????? queryUsed ???????????? setTimeout
        // ?????????????? search ???? ???????????????? ???? ?????????? ??????????????????????
        // ?? ???? ???????????????? ?????????????????? ???????????????????? ???????????????????? ???????????????????? 
        setTimeout(() => { this.props.queryUsed() }, 100);
    }
   
    render() {
        const numberOfRooms = ['1', '2', '3', '4']
        const facilities = {
            internet: '????????????????',
            conditioner: '??????????????????????',
            tv: '??????????????????',
            furniture: '????????????',
            washMachine: '???????????????????? ????????????',
            microwave: '??????????????????????????'
        }
        const $published = (
            this.props.isAdmin ?
                <div>
                    <input checked={this.state.published} onChange={this.handleOnChangePublished} id="published" type="checkbox" />
                    <label htmlFor="published" className={classes.label}>????????????????????????????</label>
                </div>
                : null
        )
        return (
            <div className={classes.wrapper}>
                {this.state.isFilterChanged ? <p className={classes.alert}>?????????????? ???????????? "??????????" ?????????? ?????????????? ?????????????????? ????????????</p> : null}
                {$published}
                <div className={classes.adress}>
                    <div>
                        <input
                            className={classes.input}
                            value={this.state.region}
                            onChange={this.handleOnChangeAdress}
                            placeholder='??????????, ????????????????' />
                    </div>
                    <div className={classes.buttonWrapper}>
                        <button onClick={this.handleOnClickSearch}
                            className={this.state.isFilterChanged ? classes.activeButton : classes.button}
                        >??????????
                        </button>
                    </div>
                </div>

                <div>
                    <label>???????????????????? ????????????</label>
                    <ul className={classes.numberOfRooms}>
                        {
                            numberOfRooms.map(number => (
                                <li key={number} className={classes.listItem}>
                                    <input
                                        checked={this.state.numberOfRooms.includes(number)}
                                        onChange={this.handleOnChangeNumberOfRooms}
                                        id={number} type="checkbox"
                                    />
                                    <label className={classes.label} htmlFor={number}>{number}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div>
                    <label>????????????????</label>
                    <div className={classes.container}>
                        <ul className={classes.list}>
                            {
                                Object.keys(facilities).slice(0, 3).map(key => (
                                    <li key={key}>
                                        <input
                                            checked={this.state.facilities.hasOwnProperty(key)}
                                            onChange={this.handleOnChangeFacilities}
                                            id={key} type="checkbox"
                                        />
                                        <label className={classes.label} htmlFor={key}>{facilities[key]}</label>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className={classes.list}>
                            {
                                Object.keys(facilities).slice(3, 6).map(key => (
                                    <li key={key}>
                                        <input
                                            checked={this.state.facilities.hasOwnProperty(key)}
                                            onChange={this.handleOnChangeFacilities}
                                            id={key} type="checkbox"
                                        />
                                        <label className={classes.label} htmlFor={key}>{facilities[key]}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div>
                    <input
                        id="forStudents"
                        type="checkbox"
                        checked={this.state.forStudents !== null}
                        onChange={this.handleOnChangeForStudents}
                    />
                    <label htmlFor="forStudents" className={classes.label}>?????????????? ??????????????????</label>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    setQuery: setQuery(dispatch),
    queryUsed: queryUsed(dispatch),
    clearQuery: clearQuery(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)