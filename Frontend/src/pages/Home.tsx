import { ChatProvider} from "../context/ChatContext";
import { ChatLayout } from "../components/ChatLayout";
const Home: React.FC = () => {
  return (
    <ChatProvider>


        <ChatLayout/>

    </ChatProvider>
  );
};
export default Home;
