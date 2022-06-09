import React, { useEffect, useState } from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids'

import { ordersGrid } from '../data/dummy'
import { Header } from '../components'
import { getOrders } from '../api'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    handleGetCustomers()
  }, [])

  const handleGetCustomers = async () => {
    try {
      const _orders = await getOrders()
      setOrders(_orders.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent id="gridcomp" dataSource={orders} allowPaging allowSorting>
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  )
}

export default Orders
