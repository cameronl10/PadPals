
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import BillIcon from '@/assets/icons/billIcon.svg'
import HomeIcon from '@/assets/icons/houseIcon.svg'
import WishIcon from '@/assets/icons/wishIcon.svg'

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "white",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#515151'
                },
            }}>
            <Tabs.Screen
                name="bills"
                options={{
                    title: "Bills",
                    tabBarIcon: ({ color, size }) => (
                        <BillIcon name="bill" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <HomeIcon name="home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="wishes"
                options={{
                    title: "Wishes",
                    tabBarIcon: ({ color, size }) => (
                        <WishIcon name="wish" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}