import React, { useEffect, useState } from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
  Sort,
  Filter,
  Selection,
  Edit,
} from '@syncfusion/ej2-react-grids'

import { customersGrid } from '../data/dummy'
import { Header } from '../components'
import { getCustomers } from '../api'

const Customers = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    handleGetCustomers()
  }, [])

  const handleGetCustomers = async () => {
    try {
      const _customers = await getCustomers()
      setCustomers(_customers.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customers}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  )
}

export default Customers
