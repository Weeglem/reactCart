import { Spinner } from "react-bootstrap"

const LoadingPage = () => {

    return(
        <div style={{textAlign:"center"}}>
            <p>Loading...</p>
            <Spinner/>
        </div>
    )
}

export default LoadingPage;