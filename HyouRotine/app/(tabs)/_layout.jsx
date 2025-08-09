import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import AntDesign from '@expo/vector-icons/AntDesign';





export default function TabsLayout() {
  return (
    <Tabs
    // screenOptions={} estilização
    >

      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color }) => (<Ionicons name="home" size={24} color="black" />)
         }}
      />

      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: ({ color }) => (<FontAwesome name="user" size={24} color="black" />)
         }}
      />

      <Tabs.Screen
        name="configuracao"
        options={{ title: 'Configuração', tabBarIcon: ({ color }) => (<Ionicons name="settings-sharp" size={24} color="black" />)
         }}
      />

      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color }) => (<Ionicons name="cellular" size={24} color="black" />)
         }}
      />

    </Tabs>
  )
}