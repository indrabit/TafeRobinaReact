// Import Thrid Party Libraies.
import React,{ useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import Config Settings.
import colors from '../config/colors';

// Import UI Compnents.
import Button from './Button';
//
import axios, {Axios} from 'axios';
import { PSSWORD_RESET_URL } from '../api/authentication';
// Render the Forgot Password Form Component.
function ForgotPasswordForm() {

	// Reference to the Navigator.
	const navigation = useNavigation();

	// The Email Adress of the User.
	const [email, setEmail] = useState('');

	//
	// Alert.alert("Error", "Please enter your email.")
	const ResetPassword=()=>{

		if(email.length == 0){Alert.alert("Error", "Please enter your email.");return;}
		sendEmail();
	}

	const sendEmail=()=>{
		const user = {
            email: email,
	     };
		 console.log(PSSWORD_RESET_URL);
		  axios
		  .post(PSSWORD_RESET_URL, user)
		  .then(res => {
			  console.log(res.status);
			if (res.status === 205) {
				//  console.log(res.status);

				Alert.alert(
                    'Email sent successfully',
                    'Please check your email',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: true},
                  );

				navigation.navigate('Login');
			}
		  })
		  .catch(err => {
			console.log(err);
			Alert.alert(
                    'Error',
                    'Please enter your valid email',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: true},
                  );
		  });  
	}

    return ( 
		<View style={styles.container}>
			<View style={styles.form}>
				<Text style={styles.title}>Forgot{"\n"}Password?</Text>
				<Text style={styles.description}>Don't worry! It happens. Please enter the email address associated with your account.</Text>
				<View style={styles.input}>
					<FontAwesome
						name="at"
						style={styles.icon}
						size={20}
						color={colors.dark}
					/>
					<TextInput
						style={styles.textInput}
						placeholder='Email Address'
						value={email}
						onChangeText={text => setEmail(text)}
						autoCapitalize="none"
					/>
				</View>

				<Button title="Submit" onPress={() => ResetPassword()}/>
				{/* <Button title="Submit" onPress={() => navigation.navigate('Main')}/> */}
			</View>
		</View>
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
		marginVertical: 25,
		borderBottomColor: colors.light,
		borderBottomWidth: 2,
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
	},
	registerLink: {
		alignSelf: 'center',
	},
})

// Export the Component.
export default ForgotPasswordForm;