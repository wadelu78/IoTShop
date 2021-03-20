import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'The IoTShop',
  description: 'We sell the best IoT products',
  keywords: 'IoT, IoT devices, buy IoT devices',
}

export default Meta
