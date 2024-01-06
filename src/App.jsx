import React, { useState, useEffect } from 'react'
import Kanban from './components/Kanban'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    className: '',
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      <Kanban/>
    </div>
  )
}

export default App