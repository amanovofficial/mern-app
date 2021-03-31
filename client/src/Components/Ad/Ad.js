import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Ad.module.css";
class Ad extends Component {

    render() {
        let unpublished = (
            <span className={classes.unpublished}>(не опубликовано)</span>
        )
        return (
            <Card style={{ margin: '15px 0 15px 0' }}>
                <Link target='_blank' className={classes.ref} to={this.props.link} onClick={(event => event.nativeEvent.stopImmediatePropagation())}>
                    <Card.Header>{this.props.header}{ !this.props.published ? unpublished : null}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.price}
                            <br />
                            Добавлено в {this.props.date}
                        </Card.Text>
                    </Card.Body>
                </Link>
                {
                    this.props.showButtons
                        ? <div>
                            <button className={classes.editButton}><Link className={classes.refBtn} to={this.props.editLink}>Редактировать</Link></button>
                            <button data-id={this.props.id} onClick={this.props.onDelete} className={classes.deleteButton}>
                                Удалить
                            </button>
                        </div>
                        : null
                }
            </Card>
        )
    }
}

export default Ad