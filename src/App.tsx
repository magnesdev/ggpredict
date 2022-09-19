import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomTable from './components/table/table';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <CustomTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
