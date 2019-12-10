import React from 'react';
import {BookStoreServiceConsumer} from "../book-store-service-context";


const withBookStoreService = () =>(Wrapped)=>{
    return (props) => {
        return (
            <BookStoreServiceConsumer>
                {
                    (bookstoreService) => {
                        return(<Wrapped {...props} bookStoreService={bookstoreService}/>);
                    }
                }
            </BookStoreServiceConsumer>
        )

    }
};

export default withBookStoreService;