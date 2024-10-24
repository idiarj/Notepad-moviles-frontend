import { Text, View } from "react-native"; 
import { Link } from "expo-router";

export default function Detail() {
    return (
        <View>
            <Link href="/login">
                <Text style={{ color: 'blue' , marginLeft: '100'}}>volver</Text>
            </Link>
        </View>
    );
}