import { useEffect, useState } from 'react';
import './App.css';
import Content from './component/Content';
import Footer from './component/Footer';
import Header from './component/Header';
import authService from './service/auth.service';
import HeaderMobile from './component/HeaderMobile';

function App() {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user)
    }
  })
  return (
    <div className="App">
      {user ?
        <div>
          {/* <Header /> */}
          <HeaderMobile />
          {/* <Content /> */}
        </div>
        :
        <div>
          {/* <Content /> */}
        </div>
      }
      <Content />
    </div>
  );
}

export default App;
