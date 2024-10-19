import { Text, View } from "react-native-web";
import { Link } from "expo-router";

export default function Detail() {
    return (
        <View>
            <Text>Notepad-moviles</Text>
         <Link to="/login" className='text-blue-400'>ir al about</Link>
        </View>
    );
}   