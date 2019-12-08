import React, {Component} from 'react';
import BookListItem from "../book-list-item";
import { connect} from 'react-redux'
import {withBookStoreService} from '../hoc';

import {bindActionCreators} from 'redux';

import './book-list.css';
import {booksLoaded, booksRequested} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";

class BookList extends Component{

    componentDidMount() {
        const {bookStoreService, booksLoaded, booksRequested} = this.props;
        booksRequested();
        bookStoreService.getBook().then((data)=>{
           booksLoaded(data);
       })



    }

    render() {
        const { books, loading} = this.props;

        if (loading){
            return <Spinner/>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    // return {
    //     booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks))
    //     }
    // }
    return bindActionCreators({booksLoaded, booksRequested}, dispatch)
};

export default compose(
    withBookStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

//withBookStoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
