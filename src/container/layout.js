import React from 'react';
import Header from './header'
import Content from './content'

const Layout = () => {

    return (
        <div>
            <div>
                <Header />
                <div>
                    <Content />
                </div>
            </div>
        </div>
    )
}

export default Layout
