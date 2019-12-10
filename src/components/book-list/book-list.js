import React, {Component} from 'react';
import BookListItem from "../book-list-item";
import { connect} from 'react-redux'
import {withBookStoreService} from '../hoc';

import {bindActionCreators} from 'redux';

import './book-list.css';
import {booksLoaded, booksRequested, booksError} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class BookList extends Component{

    componentDidMount() {
        const {bookStoreService, booksLoaded, booksRequested, booksError} = this.props;
        booksRequested();
        bookStoreService.getBook()
            .then((data)=>booksLoaded(data))
            .catch((err)=>booksError(err));



    }

    render() {
        const { books, loading, error} = this.props;

        if (loading){
            return <Spinner/>
        }

        if (error){
            return <ErrorIndicator/>;
        }

        return(
            <ul className="books-list">
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
        books: state.books,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    // return {
    //     booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks))
    //     }
    // }
    return bindActionCreators({booksLoaded, booksRequested, booksError}, dispatch)
};

export default compose(
    withBookStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

//withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
