import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

import { type VenderAgoraResultado } from "../../utils/mock";
import {
    Container,
    BackButton,
    PageTitle,
    Subtitle,
    InputContainer,
    Input,
    Button,
    DetailCard,
    CardHeader,
    Recommendation,
    MetricsGrid,
    Loader as LoaderSpinner
} from "../../globalStyles";
import SellNowService from "../../services/sell";

const VerifySale: React.FC = () => {
    const service = new SellNowService();

    const [ticker, setTicker] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VenderAgoraResultado[] | null>(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleAnalisar = async () => {
        if (!ticker.trim()) return;
        setLoading(true);
        try {
            const response = await service.post(ticker ? [ticker.trim()] : []);
            setResult(response.resultados);
        } catch (error) {
            console.error(error);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const getDecisaoGradient = (decisao: string) => {
        if (decisao.includes('VENDER AGORA')) return theme.gradients.danger;
        if (decisao.includes('CONSIDERAR')) return theme.gradients.warning;
        return theme.gradients.primary;
    };

    useEffect(() => {
        handleAnalisar()
    }, [])

    return (
        <Container>
            <BackButton onClick={() => navigate('/home')}>
                <ArrowLeft size={16} /> Voltar
            </BackButton>

            <PageTitle>🚨 Verificar Venda Urgente</PageTitle>
            <Subtitle>Analise se é o momento de vender sua ação</Subtitle>

            <InputContainer>
                <Input
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Ex: ITUB4.SA"
                />
                <Button onClick={handleAnalisar} disabled={loading} gradient={theme.gradients.danger}>
                    {loading ? 'Analisando...' : 'Analisar Venda'}
                </Button>
            </InputContainer>

            {loading && <LoaderSpinner />}

            {result && (
                result.map((value: VenderAgoraResultado) => (
                    <DetailCard gradient={getDecisaoGradient(value.decisao)}>
                        <CardHeader>
                            <div>
                                <h3>{value.ticker}</h3>
                                <div className="company">{value.empresa}</div>
                            </div>
                        </CardHeader>

                        <Recommendation>
                            <div className="title">Decisão</div>
                            <div className="decision">{value.decisao}</div>
                            <div className="detail" style={{ marginTop: '1rem', fontSize: '1rem' }}>
                                {value.motivo}
                            </div>
                        </Recommendation>

                        <MetricsGrid style={{ marginTop: '1.5rem' }}>
                            <div className="metric">
                                <div className="label">Preço Atual</div>
                                <div className="value">R$ {value.preco_atual_brl ? value.preco_atual_brl.toFixed(2) : 'Sem valor'}</div>
                            </div>
                            <div className="metric">
                                <div className="label">RSI</div>
                                <div className="value">{value.rsi ? value.rsi.toFixed(1) : 'Sem valor'}</div>
                            </div>
                            <div className="metric" style={{ gridColumn: '1 / -1' }}>
                                <div className="label">Variação (5 dias)</div>
                                <div className="value" style={{ color: value.variacao_5d_percent >= 0 ? '#00b37e' : '#ff4d4f' }}>
                                    {value.variacao_5d_percent >= 0 ? '+' : ''}{value.variacao_5d_percent ? `${value.variacao_5d_percent.toFixed(2)}%` : 'Sem Valor'}
                                </div>
                            </div>
                        </MetricsGrid>
                    </DetailCard>
                ))
            )}
        </Container>
    );
};

export default VerifySale;
