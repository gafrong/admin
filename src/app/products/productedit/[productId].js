import { useRouter } from "next/router";

const ProductDetails = () => {
    const router = useRouter();
    const { productId } = router.query;

    // Fetch and display product details using the productId

    return (
        <div>
            <h1>Product Details</h1>
            <p>Product ID: {productId}</p>
            {/* Display other product details */}
        </div>
    );
};

export default ProductDetails;
