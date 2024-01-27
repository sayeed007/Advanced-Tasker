import './styles/output.css';
import './App.css';
import FooterComponent from './components/footer/Footer'
import HeaderComponent from './components/header/Header'
import { TaskProvider } from './components/context/TaskContext';
import MainBodyComponentAdvanced from './components/mainContents/MainBodyComponentAdvanced';

function App() {

  return (
    <TaskProvider>
      <div className='bg-[#172227] font-[Inter] text-white'>

        <HeaderComponent />

        <MainBodyComponentAdvanced />

        <FooterComponent />

      </div>
    </TaskProvider>
  )
}

export default App
