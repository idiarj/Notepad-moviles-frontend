import { Text, View } from "react-native"; // Cambia de react-native-web a react-native
import { Link } from "expo-router";

export default function Detail() {
    return (
        <View>
            <Text>Notepad-moviles</Text>
            <Link href="/login">
                <Text style={{ color: 'blue' }}>Ir al about</Text>
            </Link>
        </View>
    );
}