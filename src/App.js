import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Additem from './Additem';
import Searchitem from './Searchitem';
import { useEffect, useState } from 'react';
function App() {
  const API_URL = 'http://localhost:3500/items/';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=> {
    const fetchItems = async () => {
      try{
        const response= await fetch(API_URL);
        if(!response.ok) throw Error('no recibo data esperada');
        const listItems = await response.json();
        setFetchError(null);
        setItems(listItems);
      } catch(err){
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
      setTimeout(()=> {
        (async () => await fetchItems())()
      },200)
        
  },[])


  const addItem= (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }
  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id===id ? {...item,
    checked:!item.checked} : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
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
      <Searchitem
        search={search}
        setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red"}}>{`Error: ${fetchError}`}</p>} 
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes
            (search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer 
      length={items.length}/>
    </div>
  );
}

export default App;
