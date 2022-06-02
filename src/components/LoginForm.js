// Import Thrid Party Libraies.
import React, { useState,useContext } from 'react';

import {
	Alert,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import Config Settings.
import colors from '../config/colors';

// Import UI Compnents.
import Button from './Button';
import Link from './Link';

// Import Login URL
import { LOGIN_URL } from '../api/authentication';
import axios from 'axios';
import { AuthContext } from '../service/context';

// Render the Login Form Component.
function LoginForm() {
	//use context
	const {signIn} = useContext(AuthContext);

	// Reference to the Navigator.
	const navigation = useNavigation();

	// The Email Adress of the User.
	const [email, setEmail] = useState('');

	// Whether the Email is Valid.
	const [emailValid, setEmailValid] = useState(true);

	// The Password of the User.
	const [password, setPassword] = useState('');

	// Whether the Password is Valid.
	const [passwordValid, setPasswordValid] = useState(true);

	// Validate the Data in the Login Form.
	function ValidateForm(){

		// const {signIn} = useContext(AuthContext);

		// Validate the Form Data.
		if(email.length == 0){
			Alert.alert("Error", "Please enter your email.");
			setEmailValid(false);
			return;
		}
		if(!email.includes('@') || !email.includes('.com')){
			Alert.alert("Error", "Please enter a valid email.");
			setEmailValid(false);
			return;}
		if(password.length == 0){
			Alert.alert("Error", "Please enter your password.");
			setEmailValid(true);
			setPasswordValid(false);
			return;
		}
		if(password.length < 4){
			Alert.alert("Error", "Password must be atleast 6 characters long.");
			setEmailValid(true);
			setPasswordValid(false);
			return;
		}

		//Login api
		loginUser();

		// TODO: Hash User Password.
		// TODO: Send Email & Password to Server.
		//Alert.alert("Welcome");
		setEmail('');
		setEmailValid(true);
		setPassword('');
		setPasswordValid(true);
		// Call api connection
	}
	//

	const loginUser=()=>{
		const user = {
            email: email,
            password: password,
          };
		//   console.log(LOGIN_URL);
		  axios
		  .post(LOGIN_URL, user)
		  .then(res => {
			  
			if (res.status === 200) {
			//   console.log(res.data)
			  const foundData=res.data;
			//  console.log(`Name = ${res.data.username}`);
			//   console.log(`Token = ${res.data.token[0]}`);
			// const userToken=`${res.data.token[0]}`;
			// console.log(userToken);
			signIn(foundData);
			navigation.navigate('Main');
			}
			
		  })
		  .catch(err => {
			// console.log(err);
			
			const errorCode = parseInt(err.response.status,10);
			// console.log(errorCode);
			if(errorCode === 423){
				Alert.alert(
					'Account locked:','Many login attempts. Please try again later.',
					[{text: 'OK'}],
					{cancelable: true},
				  );
			}
			else{
				Alert.alert(
					'Invalid Credentials',
					'Please check your email and password',
					[{text: 'OK'}],
					{cancelable: true},
				  );

			}
			
		  });  
	}

    return ( 
		<KeyboardAvoidingView style={styles.container}>
			<View style={styles.form}>
				<Text style={styles.title}>Welcome</Text>
				<Text style={styles.description}>Please login with your credentials.</Text>
				<View style={[styles.input, emailValid ? styles.inputValid : styles.inputInvalid]}>
					<FontAwesome
						name="at"
						style={styles.icon}
						size={20}
						color={colors.dark}
					/>
					<TextInput
						style={styles.textInput}
						placeholder='Email Address'
						placeholderTextColor={colors.dark}
						value={email}
						onChangeText={text => setEmail(text)}
						autoCapitalize="none"
					/>
				</View>
				<View style={[styles.input, passwordValid ? styles.inputValid : styles.inputInvalid]}>
					<FontAwesome
						name="lock"
						style={styles.icon}
						size={20}
						color={colors.dark}
					/>
					<TextInput
						style={styles.textInput}
						placeholder='Password'
						placeholderTextColor={colors.dark}
						value={password}
						onChangeText={text => setPassword(text)}
						autoCapitalize="none"
						secureTextEntry
					/>
				</View>
				<Link
					title="Forgot Password?"
					style={styles.forgotPasswordLink}
					onPress={() => navigation.navigate('ForgotPassword')}
				/>
				<Button title="Login" onPress={() => ValidateForm()}/>
				<Text style={styles.label}>Don't have an account?</Text>
				<Link
					title="Register"
					style={styles.registerLink}
					onPress={() => navigation.navigate('Register')}
				/>
			</View>
		</KeyboardAvoidingView>
    );
}

// Style the Components.
const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
	form: {
		width: '100%',
		backgroundColor: colors.white,
		borderRadius: 25,
		padding: 5,
		justifyContent: 'center',
	},
	title: {
		color: colors.dark,
		fontSize: 35,
		fontWeight: 'bold',
		paddingLeft: 15,
		paddingTop: 15,
	},
	description: {
		color: colors.dark,
		fontSize: 14,
		padding: 15,
	},
	input:{
		flexDirection:'row',
		justifyContent: 'center',
		marginHorizontal: 15,
		marginVertical:10,
		//borderBottomColor: colors.light,
		borderBottomWidth: 2,
	},
	inputValid:{
		borderBottomColor: colors.light,
	},
	inputInvalid:{
		borderBottomColor: colors.primary,
	},
	icon:{
		alignSelf: 'center',
		padding: 5,
		width: 30,
	},
	textInput: {
		flex:1,
		color: colors.dark,
		padding: 10,

		// ALT Style:
		// backgroundColor: colors.light,
		// marginHorizontal: 15,
		// marginVertical:10,
		// borderRadius: 10,
	},
	label: {
		color: colors.dark,
		fontSize: 15,
		alignSelf: 'center',
	},
	forgotPasswordLink: {
		alignSelf: 'flex-end',
		marginHorizontal: 15,
	},
	registerLink: {
		alignSelf: 'center',
	},
})

// Export the Component.
export default LoginForm;