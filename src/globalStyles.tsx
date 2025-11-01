import styled from 'styled-components'

export const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.gradients.background};
  color: ${props => props.theme.colors.text};
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 2rem 1rem;
  min-width: 100%;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00b37e 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #999;
  font-size: 1.125rem;
  margin-bottom: 3rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #999;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const HomeButton = styled.button<{ gradient: string }>`
  background: ${props => props.gradient || props.theme.gradients.primary};
  border: none;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 179, 126, 0.3);
  }
  
  svg {
    width: 3rem;
    height: 3rem;
    margin: 0 auto 1rem;
    display: block;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const InputContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: ${(props) => props.theme.colors.secondary};
  border: 2px solid #333;
  border-radius: 1rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 179, 126, 0.1);
  }
  
  &::placeholder {
    color: #666;
  }
`;

export const Button = styled.button<{ gradient?: string }>`
  width: 100%;
  padding: 1.25rem 2rem;
  background: ${props => props.gradient || props.theme.gradients.primary};
  border: none;
  border-radius: 1rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 179, 126, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const Card = styled.div<{ gradient: string }>`
  background: ${props => props.gradient || props.theme.colors.secondary};
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .company {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
  }
  
  .sector {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }
  
  .price {
    font-size: 2rem;
    font-weight: 700;
    text-align: right;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .metric {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 0.75rem;
    
    .label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    
    .value {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
`;

export const Recommendation = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  
  .title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .decision {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }
  
  .detail {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  
  .spinner {
    width: 4rem;
    height: 4rem;
    border: 4px solid rgba(0, 179, 126, 0.2);
    border-top-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.125rem;
`;

export const SimpleCard = styled.div<{ gradient: string }>`
  background: ${props => props.gradient || props.theme.colors.secondary};
  padding: 1.5rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .company {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }
  
  .price {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .currency {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }
`;

export const Select = styled.select`
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.input};
    color: ${props => props.theme.colors.text};
    font-size: 1em;
    width: 100%;
    margin: 4px 0;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

export const DetailCard = styled(Card)`
  max-width: 700px;
  margin: 0 auto;
`;

export const GlobalStyle = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = GlobalStyle;
document.head.appendChild(styleSheet);