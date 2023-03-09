import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PrivateRoute from './components/PrivateRoute';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                  {'  '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="/admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="/admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" exact element={<ProductScreen />} />
            <Route path="/product/:id/edit" exact element={<ProductEditScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path="/productlist" element={<AdminRoute />}>
              <Route path="/productlist" element={<ProductListScreen />} />
            </Route>
            <Route path="/orderlist" element={<AdminRoute />}>
              <Route path="/orderlist" element={<OrderListScreen />} />
            </Route>
            <Route path="/userlist" element={<AdminRoute />}>
              <Route path="/userlist" element={<UserListScreen />} />
            </Route>
            <Route path="/user/:id/edit" element={<AdminRoute />}>
              <Route path="/user/:id/edit" element={<UserEditScreen />} />
            </Route>
            <Route path="/productlist/seller" element={<SellerRoute />}>
              <Route path="/productlist/seller" element={<ProductListScreen />} />
            </Route>
            <Route path="/orderlist/seller" element={<SellerRoute />}>
              <Route path="/orderlist/seller" element={<OrderListScreen />} />
            </Route>
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
