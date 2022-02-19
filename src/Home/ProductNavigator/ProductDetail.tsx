import React from 'react'
import { Text } from '../../components'
import { ProductNavigationProps } from '../../components/Navigation'

const ProductDetail = ({navigation}: ProductNavigationProps<"ProductDetail">) => {
  return (
    <Text marginTop="xl" onPress={() => navigation.navigate("Product")}>Product DETAIL</Text>
  )
}

export default ProductDetail