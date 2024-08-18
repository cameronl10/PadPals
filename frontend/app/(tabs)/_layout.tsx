
import { Tabs } from 'expo-router'

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:"white",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#515151',
                    height:65
                },
            }}>
            <Tabs.Screen 
                name="bills" 
                options={{ 
                    title: "Bills",
                    tabBarIcon: ({color,size}) => {
                        
                    }
                }} 
            />
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="wishes" options={{ title: "Wishes" }} />
        </Tabs>
    );
}