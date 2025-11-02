import { useTheme } from "styled-components";
import { ButtonGrid, Container, HomeButton, PageTitle, Subtitle } from "../../globalStyles";
import { TrendingUp, DollarSign, AlertTriangle, ShoppingCart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Container>
            <PageTitle>📈 Análise de Ações Inteligente</PageTitle>
            <Subtitle>Tome decisões de investimento baseadas em dados</Subtitle>

            <ButtonGrid>
                <HomeButton
                    onClick={() => navigate('/analysis')}
                    gradient={theme.gradients.primary}
                >
                    <TrendingUp />
                    <h3>Analisar Ações</h3>
                    <p>Análise completa com recomendações</p>
                </HomeButton>

                <HomeButton
                    onClick={() => navigate('/find-actions')}
                    gradient={theme.gradients.info}
                >
                    <DollarSign />
                    <h3>Buscar por Preço</h3>
                    <p>Encontre ações dentro do seu orçamento</p>
                </HomeButton>

                <HomeButton
                    onClick={() => navigate('/verify-sales')}
                    gradient={theme.gradients.danger}
                >
                    <AlertTriangle />
                    <h3>Verificar Venda</h3>
                    <p>Avalie se é hora de vender</p>
                </HomeButton>

                <HomeButton
                    onClick={() => navigate('/register-action')}
                    gradient={theme.gradients.card2}
                >
                    <ShoppingCart />
                    <h3>Registrar ações compradas</h3>
                    <p>Avalie suas ações</p>
                </HomeButton>
            </ButtonGrid>
        </Container>
    )
};

export default HomePage