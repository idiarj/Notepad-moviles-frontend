import { ScrollView, Text } from "react-native-web";
import { Link } from "react-router-dom";

export function About() {
    return (
        <ScrollView>
            <Link to="/login" className='text-blue-400'>ir al about</Link>
            <Text>Notepad-moviles</Text>
        </ScrollView>
    );
}