import React, {Component} from 'react';
import BookListItem from "../book-list-item";
import { connect} from 'react-redux'
import {withBookStoreService} from '../hoc';


import './book-list.css';
import {fetchBooks} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class BookList extends Component{

    componentDidMount() {
        this.props.fetchBooks()
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

const mapDispatchToProps = (dispatch, {bookStoreService}) => {
    return {
        fetchBooks: fetchBooks(bookStoreService, dispatch)

    }
    //return bindActionCreators({booksLoaded, booksRequested, booksError}, dispatch)
};

export default compose(
    withBookStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

//export default withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
