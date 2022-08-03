import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Additem from './Additem';
import { useState } from 'react';
function App() {
  const[items, setItems] = useState([

    {
      id: 1,
      checked: true,
      item: "Nesquick"
    },
    {
      id: 2,
      checked: false,
      item: "Item2"
    },
    {
      id: 3,
      checked: false,
      item: "Item3"
    },
  ]);
  const [newItem, setNewItem] = useState('')

  const setAndSaveItems = (newItems) => {
    setItems(newItems); 
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const addItem= (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  }
  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id===id ? {...item,
    checked:!item.checked} : item);
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    // addItem
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header />
      <Additem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit} />
      <Content 
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}/>
      <Footer 
      length={items.length}/>
    </div>
  );
}

export default App;
