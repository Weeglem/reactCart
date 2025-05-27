const ProductScore = ({ProductInfo}) => {

    return(
        <> {[...Array(5).keys()].map(
            key => (             
                key > Math.trunc(ProductInfo.rating.rate) ? 
                <i key={key} className="bi bi-star"></i>
                :
                <i key={key} className="bi bi-star-fill"></i>
                        
            )             
            )} ({ProductInfo.rating.count})
        </>
    );
}

export default ProductScore;