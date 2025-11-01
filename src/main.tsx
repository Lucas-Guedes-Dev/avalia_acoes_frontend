import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './globalStyles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContainer>
          <App />
        </AppContainer>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
