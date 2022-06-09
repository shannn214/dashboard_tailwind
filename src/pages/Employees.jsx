import React, { useEffect, useState } from 'react'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from '@syncfusion/ej2-react-grids'

import { employeesGrid } from '../data/dummy'
import { Header } from '../components'
import { getEmployees } from '../api'

const Employees = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    handleGetEmployees()
  }, [])

  const handleGetEmployees = async () => {
    try {
      const _employees = await getEmployees()
      setEmployees(_employees.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Emplpoyees" />
      <GridComponent
        dataSource={employees}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  )
}

export default Employees
