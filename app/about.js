import { ScrollView, Text } from "react-native-web";
import { Link } from "react-router-dom";

export function About() {
    return (
        <ScrollView>
            <Link to="/login" className='text-blue-400'>
            <Text>ir al about</Text>
            </Link>
            <Text>Notepad-moviles</Text>
        </ScrollView>
    );
}