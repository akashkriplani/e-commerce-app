import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createProduct, listProducts, deleteProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
  const location = useLocation();
  const sellerMode = location.pathname.indexOf('seller') !== -1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const createHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, successCreate, createdProduct, navigate, successDelete, sellerMode, userInfo]);

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button className="primary" type="button" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <th>{product._id}</th>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>{product.category}</th>
                <th>{product.brand}</th>
                <th>
                  <button className="small" type="button" onClick={() => navigate(`/product/${product._id}/edit`)}>
                    Edit
                  </button>
                  <button className="small" type="button" onClick={() => deleteHandler(product)}>
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;
