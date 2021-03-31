import React, { Component } from "react";
import classes from "./UsersFilter.module.css";
import { connect } from "react-redux";
import { setQuery, queryUsed, clearQuery } from "../../store/actions/filterActions";
const createState = () => ({
    name: '',
    phoneNumber: '+998',
    isBlocked: false,
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

            if (this.state.name) {
                query.push(`&name=${this.state.name}`)
            }

            if (this.state.phoneNumber.length === 13) {
                query.push(`&phoneNumber=${this.state.phoneNumber}`)
            }

            query.push(`&isBlocked=${this.state.isBlocked}`)

            if (query.length > 0) {
                query = query.join('')
            } else {
                query = null
            }
            this.props.setQuery(query)
        }
    }


    handleOnChangeName = (e) => {
        this.setState({ name: e.target.value, isFilterChanged: true })
    }


    handleOnChangePhoneNumber = (e) => {
        const length = e.target.value.length
        if (length < 4 || length > 13) {
            return
        }
        this.setState({ phoneNumber: e.target.value, isFilterChanged: true })
    }


    handleOnChangeAccessState = (e) => {
        if (e.target.checked) {
            this.setState({ isBlocked: true, isFilterChanged: true })
        } else {
            this.setState({ isBlocked: false, isFilterChanged: true })
        }
    }
    handleOnClickSearch = () => {
        this.setState({ isFilterChanged: false })
        this.props.search()
        // если не вызвать функцию queryUsed внутри setTimeout
        // функция search не успевает до конца срабатывать
        // и на странице появяться результаты предыдущей фильтрации 
        setTimeout(() => { this.props.queryUsed() }, 100);
    }

    render() {

        return (
            <div className='sm-12'>
                <div className={classes.wrapper}>
                    {this.state.isFilterChanged ? <p className={classes.alert}>Нажмите кнопку "Найти" чтобы увидеть результат поиска</p> : null}
                    <div className={classes.adress}>
                        <div className={classes.inputs}>
                            <input
                                className={classes.input}
                                value={this.state.name}
                                onChange={this.handleOnChangeName}
                                placeholder='Имя' />
                            <input
                                className={classes.input}
                                value={this.state.phoneNumber}
                                onChange={this.handleOnChangePhoneNumber}
                                placeholder='Номер телефона' />
                        </div>
                        <div className={classes.buttonWrapper}>
                            <button onClick={this.handleOnClickSearch}
                                className={this.state.isFilterChanged ? classes.activeButton : classes.button}
                            >Найти
                        </button>
                        </div>
                    </div>

                    <div>
                        <input
                            id="isBlocked"
                            type="checkbox"
                            checked={this.state.isBlocked}
                            onChange={this.handleOnChangeAccessState}
                        />
                        <label htmlFor="isBlocked" className={classes.label}>Блокированные</label>
                    </div>
                </div >
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setQuery: setQuery(dispatch),
    queryUsed: queryUsed(dispatch),
    clearQuery: clearQuery(dispatch)
})

export default connect(null, mapDispatchToProps)(Filter)