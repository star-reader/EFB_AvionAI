//import React from 'react'
import ReactDOM from 'react-dom/client'
//import { RouterProvider } from 'react-router-dom'
import App from './App.tsx'
//import router from './router'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../node_modules/leaflet/dist/leaflet.css'
import './index.css'
import './themes/global.less'
import './themes/animation.css'
import './themes/antd-overrid.less'
import './themes/night.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
