const ProductScore = ({ProductInfo}) => {

    const x = ProductInfo.rating != undefined ? ProductInfo.rating.rate : 0;
    const y = ProductInfo.rating != undefined ? ProductInfo.rating.count : 0;
    return(
        
        <> 
        {[...Array(5).keys()].map(
            key => (             
                key > Math.trunc( x ) ? 
                <i key={key} className="bi bi-star"></i>
                :
                <i key={key} className="bi bi-star-fill"></i>
                        
            )             
            )} ({y})
            
        </>
    );
}

export default ProductScore;