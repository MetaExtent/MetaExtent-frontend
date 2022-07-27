import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import { store } from './components/store/store';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
// import theme from './components/theme';
// import { ColorModeScript } from '@chakra-ui/react'


const theme = extendTheme({
  components: {
    Steps,
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
        <App />
      </ChakraProvider>
    </Provider>

  </React.StrictMode>
);
