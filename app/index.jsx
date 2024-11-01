import App from '../components/App'
import Toast from 'react-native-toast-message';
import Context from '../context/Context';

const index = () => {
  return (
    <Context>
      <App />
      <Toast />
    </Context>
  )
}

export default index