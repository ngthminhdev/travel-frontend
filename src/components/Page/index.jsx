import React, from 'react';
// import Footer from './Footer';
import Header from "../Header";

const Page = ({children}) => {
    return (
        <>
            <Header/>
            <WrappedComponent {...props} />
            {/*<Footer />*/}
        </>
    );
};

export default Page;
