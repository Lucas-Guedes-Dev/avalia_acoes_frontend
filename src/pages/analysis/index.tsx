import type React from "react";
import { BackButton, Button, Card, CardHeader, CardsGrid, Container, Input, InputContainer, MetricsGrid, PageTitle, Recommendation, Subtitle } from "../../globalStyles";
import { ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import { useTheme } from "styled-components";
import { type AnaliseResultado } from "../../utils/mock";
import { useNavigate } from "react-router-dom";
import Analyze from "../../services/analyze";

const AnalysisPage: React.FC = () => {
  const service = new Analyze();

  const [tickers, setTickers] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnaliseResultado[]>([]);


  const theme = useTheme();
  const navigate = useNavigate();

  const handleAnalise = async () => {
    if (!tickers.trim()) return;
    setLoading(true);
    try {
      const tickerList = tickers.split(',').map(t => t.trim()).filter(Boolean);
      const response = await service.post(tickerList);
      setResults(response.resultados);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCardGradient = (rec: any) => {
    if (rec.includes('Forte') && !rec.includes('cautela')) return theme.gradients.strongPrimary;
    if (rec.includes('Comprar') && !rec.includes('cautela')) return theme.gradients.primary;
    if (rec.includes('cautela')) return theme.gradients.warning;
    if (rec.includes('observação')) return 'linear-gradient(135deg, #4a4a4a 0%, #6a6a6a 100%)';
    return theme.gradients.danger;
  };


  return (
    <Container>
      <BackButton onClick={() => navigate('/home')}>
        <ArrowLeft size={16} /> Voltar
      </BackButton>

      <PageTitle>📊 Análise de Ações</PageTitle>
      <Subtitle>Digite os tickers separados por vírgula</Subtitle>

      <InputContainer>
        <Input
          value={tickers}
          onChange={(e) => setTickers(e.target.value)}
          placeholder="PETR4.SA, VALE3.SA, ITUB4.SA"
          theme={theme}
        />
        <Button onClick={handleAnalise} disabled={loading} theme={theme}>
          {loading ? 'Analisando...' : 'Analisar'}
        </Button>

      </InputContainer>

      {loading && <Loader color={theme.colors.primary}><div className="spinner" /></Loader>}

      <CardsGrid>
        {results.map((result, idx) => (
          <Card key={idx} gradient={getCardGradient(result.recomendacao)} theme={theme}>
            <CardHeader>
              <div>
                <h3>{result.ticker}</h3>
                <div className="company">{result.empresa}</div>
                <div className="sector">{result.setor}</div>
              </div>
              <div className="price">R$ {result.preco_atual ? result.preco_atual.preco_brl.toFixed(2) : 'Sem valor'}</div>
            </CardHeader>

            <MetricsGrid>
              <div className="metric">
                <div className="label">P/L</div>
                <div className="value">{result.pl ? result.pl.toFixed(1) : 'Sem valor'}</div>
              </div>
              <div className="metric">
                <div className="label">ROE</div>
                <div className="value">{result.roe ? result.roe.toFixed(1) : 'Sem valor'}%</div>
              </div>
              <div className="metric">
                <div className="label">Margem Líquida</div>
                <div className="value">{result.margem_liquida ? result.margem_liquida.toFixed(1) : 'Sem valor'}%</div>
              </div>
              <div className="metric">
                <div className="label">Dividend Yield</div>
                <div className="value">{result.dividend_yield ? result.dividend_yield.toFixed(1) : 'Sem valor'}%</div>
              </div>
            </MetricsGrid>

            <Recommendation>
              <div className="title">Recomendação</div>
              <div className="decision">{result.recomendacao}</div>
              <div className="detail">⭐ Pontuação: {result.pontuacao}/6</div>
              <div className="detail">📅 {result.horizonte_investimento}</div>
            </Recommendation>
          </Card>
        ))}
      </CardsGrid>
    </Container>
  );
};

export default AnalysisPage;