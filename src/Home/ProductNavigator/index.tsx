import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { ProductRoutes } from "../../components/Navigation"
import Product from "./Product"
import ProductDetail from "./ProductDetail"

const ProductStack = createStackNavigator<ProductRoutes>()

export const ProductNavigator = () => {
    return (
        <ProductStack.Navigator screenOptions={{ headerShown: false }}>
            <ProductStack.Screen name="Product" component={Product}/>
            <ProductStack.Screen name="ProductDetail" component={ProductDetail}/>
        </ProductStack.Navigator>
    )
}