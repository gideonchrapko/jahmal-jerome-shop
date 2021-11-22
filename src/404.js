import React from 'react'
// import Header from './Header'

const pageNotFound = () => {

    return (
        <div>
            {/* <Header /> */}
                <div style={{ position: "relative", zIndex: "999", paddingTop: "20%", textAlign: "center"}}>
                    <h1>
                        404
                    </h1>
                    <h1>
                        Page Not Found
                    </h1>
                </div>
        </div>
    )
}

export default pageNotFound;