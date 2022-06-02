// Import Thrid Party Libraies.
import React,{useState,useEffect,useContext} from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	FlatList,
	Text
} from 'react-native';

// Import Config Settings.
import colors from '../config/colors';

// Import UI Components.
import Header from '../components/Header';
import Button from '../components/Button';
import Space from '../components/Space';
import SettingsItem from '../components/SettingsItem';

//use context
import { AuthContext,TOKEN_KEY,USER_KEY } from '../service/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

// List of More Pages.
const settings = [
	{
		"title": "Change Campus",
		"screen": "Modal",
		"icon": "map-marker",
	},
	{
		"title": "Send Feedback",
		"screen": "Feedback",
		"icon": "comment",
	},
	{
		"title": "Report a Bug",
		"screen": "ReportBug",
		"icon": "bug",
	},
	{
		"title": "Terms & Conditions",
		"screen": "TermsConditions",
		"icon": "info-circle",
	},
	{
		"title": "Privacy Policy",
		"screen": "PrivacyPolicy",
		"icon": "warning",
	},
	{
		"title": "Credits",
		"screen": "Credits",
		"icon": "group",
	},
	{
		"title": "Campus Finder",
		"screen": "CampusFinder",
		"icon": "map-marker",
	},
]

// Render the More Screen.
function MoreScreen({ navigation }) {
	const isFocused = useIsFocused();
	const [useauth,setUseauth]=useState(false);
	const [username,setUsername]=useState('');
	const {signOut}=useContext(AuthContext);
	
	
	useEffect(()=>{
		if(isFocused){
			getAuthState();
		}
	},[isFocused]);

	 // Get Auth state
	const getAuthState = async () => {
        try {
				//GET TOKEN
				let token = await AsyncStorage.getItem(TOKEN_KEY);
				let userValue=await AsyncStorage.getItem(USER_KEY);
				if (token !== null){
					setUseauth(true);
					const v='Hello '+ userValue + ', SignOut'
					setUsername(v);
				}
			} catch (error) {
            throw new Error(error)
        }
    };
	
	const logOut=()=>{
		signOut('');
		setUseauth(false);
		setUsername('');
	}

    return (
        <SafeAreaView style={styles.container}>
			<View style={styles.contentWrapper}>
				<Header title="More"/>
				
				<FlatList
					style={styles.scrollView}
					data={settings}
					numColumns={2}
					keyExtractor={setting => setting.title}
					renderItem={({ item }) =>
						<SettingsItem
							title={item.title}
							icon={item.icon}
							onPress={() => navigation.navigate(item.screen)}
						/>
					}
					ItemSeparatorComponent={() =>
						<Space height={10}/>
					}

					ListHeaderComponent={() =>
						// <Space height={10}/>
						

						useauth?
						(<SettingsItem
							title={username}
							icon={'user'}
							onPress={() => logOut()}
						/>):
						(<SettingsItem
							title='Login'
							icon={'user'}
							onPress={() => navigation.navigate('Auth')}
						/>)
						
					}
					ListFooterComponent={() =>
						<Space height={55}/>
					}
				/>
			</View>
		</SafeAreaView>
    );
}

// Style the Components.
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	contentWrapper: {
		flex: 1,
		backgroundColor: colors.light,
	},
})

// Export the Component.
export default MoreScreen;