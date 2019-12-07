import React, {Component} from 'react';
import BookListItem from "../book-list-item";
import { connect} from 'react-redux'
import {withBookStoreService} from '../hoc';

import {bindActionCreators} from 'redux';

import './book-list.css';
import {booksLoaded} from "../../actions";
import {compose} from "../../utils";

class BookList extends Component{

    componentDidMount() {
        const {bookStoreService} = this.props;
        const data = bookStoreService.getBook();

        this.props.booksLoaded(data);

    }

    render() {
        const { books} = this.props;

        return(
            <ul>
                {
                    books.map((book) => {
                        return(
                            <li key={book.id}>
                                <BookListItem book={book}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
};

const mapDispatchToProps = (dispatch) => {
    // return {
    //     booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks))
    //     }
    // }
    return bindActionCreators({booksLoaded}, dispatch)
};

export default compose(
    withBookStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

//withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
