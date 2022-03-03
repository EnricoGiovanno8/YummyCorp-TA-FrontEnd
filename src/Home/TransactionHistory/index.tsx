import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { TransactionHistoryRoutes } from "../../components/Navigation"
import TransactionHistory from "./TransactionHistory"
import TransactionHistoryDetail from "./TransactionHistoryDetail"

const TransactionHistoryStack = createStackNavigator<TransactionHistoryRoutes>()

export const TransactionHistoryNavigator = () => {
    return (
        <TransactionHistoryStack.Navigator screenOptions={{ headerShown: false }}>
            <TransactionHistoryStack.Screen name="TransactionHistory" component={TransactionHistory}/>
            <TransactionHistoryStack.Screen name="TransactionHistoryDetail" component={TransactionHistoryDetail}/>
        </TransactionHistoryStack.Navigator>
    )
}