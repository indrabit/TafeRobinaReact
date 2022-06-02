// Import Thrid Party Libraies.
import React,{useReducer,useMemo,useEffect,useContext} from 'react';
import {
	Platform,
} from 'react-native';
import {
	NavigationContainer,
	useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Config files.
import colors from '../config/colors';

// Import Navigators.
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

// Import Screens.
import ModalScreen from '../screens/ModalScreen';
import CampusPickerScreen from '../screens/CampusPickerScreen';
import WebViewScreen from '../screens/WebViewScreen';

//authentication context
import { AuthContext,TOKEN_KEY,USER_KEY } from '../service/context';

// Import UI Components.
import Link from '../components/Link';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Native Stack Navigator.
const Stack = createNativeStackNavigator();

function AppNavigator(){
	const initialLoginState={
		isLoading:true,
		userToken:null,
		userKey:null
	  };
	  
	
	const loginReducer=(preState,action)=>{
		switch(action.type){
		case 'RETRIEVE_TOKEN':
			return{
				...preState,
				userToken:action.token,
				userKey:null,
				isLoading:false
			};
		case 'LOGIN':
			return{
				...preState,
				userToken:action.token,
				userKey:action.userKey,
				isLoading:false
			};
		case 'LOGOUT':
			return{
					...preState,
				userToken:null,
				userKey:null,
				isLoading:false
			};
		// case 'REGISTER':
		// 	return{
		// 		...preState,
		// 		// userName:action.id,
		// 		//userToken:action.token,
		// 		isLoading:false
		// 	};
		case 'RETRIEVE_INFO':
			return{
			...preState,                     
			};
		}

	};
	const[loginState,dispatch]=useReducer(loginReducer,initialLoginState);

	const authContext=useMemo(()=>({
		signIn:async(foundUser)=>{
			// console.log(foundUser);
			
			const userToken=`${foundUser.token[0]}`;
			const userKey=`${foundUser.username[0]}`;
			// console.log(userToken);
			// console.log(userKey);
		
		  try{
			await AsyncStorage.setItem(TOKEN_KEY,userToken);
			await AsyncStorage.setItem(USER_KEY,userKey);   
			console.log("Login success");     
		  }
		  catch(e){
			console.log(e);
		  }
		  dispatch({type:'LOGIN',token:userToken,userKey:userKey});            
		},
		signOut:async()=>{
		  try{
			await AsyncStorage.removeItem(TOKEN_KEY);
			await AsyncStorage.removeItem(USER_KEY);
			console.log("Logout success");
		  }
		  catch(e){
			console.log(e);
		  }
		dispatch({ type: 'LOGOUT' });
		},
			   
	  }),[]);
	
	  useEffect(()=>{
		setTimeout(async()=>{
		  let userToken;
		  userToken=null;
		  try{
			userToken=await AsyncStorage.getItem(TOKEN_KEY);           
		  }
		  catch(e){
			console.log(e);
		  }      
		  dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
		},1000);
	  },[]);

	  
	
	return(
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Main"
					screenOptions={{
						headerShown: false,
						animation: 'slide_from_bottom',
					}}
				>
					<Stack.Screen name="Main" component={TabNavigator}/>
					<Stack.Screen
						name="Auth"
						component={AuthNavigator}
						options={{
							presentation: 'modal',
							// headerShown: true,
							// headerBackVisible: false,
							// headerTitle: '',
							// headerRight: () => (
							// 	<Link
							// 		title="Later"
							// 		// style={styles.laterLink}
							// 		onPress={() => this.refs.navigation.navigate('Main')}
							// 	/>
							// ),
							//headerShown: Platform.OS === 'android' ? true : false,
							//headerTitle: "Select a Campus",
						}}
					/>
					<Stack.Screen
						name="Modal"
						component={CampusPickerScreen}
						options={{
							presentation: 'modal',
							headerShown: Platform.OS === 'android' ? true : false,
							headerTitle: "Select a Campus",
						}}
					/>
					<Stack.Screen
						name="WebView"
						component={WebViewScreen}
						options={{
							presentation: 'modal',
							// headerShown: Platform.OS === 'android' ? true : false,
							headerTitle: "WebView",
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

// Export the Component.
export default AppNavigator;