import logo from './logo.svg';
import './App.css';
import web3 from "./web3";
import owner from "./owner";
import { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');
  
  const [changeO, setChangeO] = useState('');

  useEffect(()=>{

    //internalType: 'address', name: 'newOwner', type: 'address' 
    const init =async () =>{
      const manager = await owner.methods.getOwner().call();
      setManager(manager);
    };
    init();
  },[])
  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // const manager = await owner.methods.getOwner().call();
    // setManager(manager);
    // console.log(manager);
    // console.log(accounts[0])
    await owner.methods.changeOwner(changeO).send({ from: accounts[0] });
    const manager = await owner.methods.getOwner().call();
    setManager(manager);
  };
  return (
    <div className="App">
      <div>
        <p>Chủ sở hữu: {manager}</p>
      </div>
      <form onSubmit={onSubmit}>
        <h4>Nhap dia chi doi chủ</h4>
        <div>
          <input type="text" value={changeO} onChange={(e) => setChangeO(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>
      
    </div>
  );
}

export default App;
