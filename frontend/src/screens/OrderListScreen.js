import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAllOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderListAll)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div>
      <h1>All orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        orders.map((order) => {
          return (
            <div key={order._id}>
              <h1>{order._id}</h1>
              <h1>{order.user.name}</h1>
            </div>
          )
        })
      )}
    </div>
  )
}

export default OrderListScreen
