import styled from "styled-components";

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

export const Button = styled.button<{ gradient?: string }>`
  padding: 1rem 2rem;
  background: ${props => props.gradient || props.theme.gradients.primary};
  border: none;
  border-radius: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 179, 126, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

export const IconButton = styled.button`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.delete {
    background: rgba(245, 87, 108, 0.2);
    
    &:hover {
      background: rgba(245, 87, 108, 0.3);
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: ${props => props.theme.colors.secondary};
  padding: 2rem;
  border-radius: 1.5rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  background: ${props => props.theme.colors.input};
  border: 2px solid #333;
  border-radius: 0.75rem;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
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

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.125rem;
  
  svg {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    opacity: 0.3;
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