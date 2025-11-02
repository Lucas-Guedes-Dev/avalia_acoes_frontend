import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import {
    Container,
    BackButton,
    PageTitle,
    Subtitle,
    DetailCard,
    CardHeader,
    Recommendation,
    MetricsGrid,
    Loader as LoaderSpinner,
    WalletGrid
} from "../../globalStyles";
import ActionService from "../../services/actions";
import type { WalletType } from "../../services/actions/types";

const WalletPage: React.FC = () => {
    const service = new ActionService();

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WalletType[] | null>(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleGetWallet = async () => {
        setLoading(true)
        try {
            const response = await service.getWallet()
            setResult(response)
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const getDecisaoGradient = (decisao: string) => {
        const d = decisao.toUpperCase();

        if (d.includes('ERRO')) return theme.gradients.card2;
        if (d.includes('VENDER JA')) return theme.gradients.danger;
        if (d.includes('VENDER EM BREVE')) return theme.gradients.warning;
        if (d.includes('MONITORAR')) return theme.gradients.info;
        if (d.includes('MANTER')) return theme.gradients.strongPrimary;

        return theme.gradients.primary;
    };

    useEffect(() => {
        handleGetWallet()
    }, [])

    return (
        <Container>
            <BackButton onClick={() => navigate('/home')}>
                <ArrowLeft size={16} /> Voltar
            </BackButton>

            <PageTitle>💼 Verificar minha carteira</PageTitle>
            <Subtitle>Analisar minha carteira</Subtitle>

            {loading && (
                <LoaderSpinner>
                    <div className="spinner" />
                </LoaderSpinner>
            )}
            <WalletGrid>
                {result && (

                    result.map((value: WalletType) => (
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
                                    <div className="value">R$ {value.detalhes && value.detalhes.preco_atual_brl ? value.detalhes.preco_atual_brl.toFixed(2) : 'Sem valor'}</div>
                                </div>
                                <div className="metric">
                                    <div className="label">RSI</div>
                                    <div className="value">{value.detalhes && value.detalhes.rsi ? value.detalhes.rsi.toFixed(1) : 'Sem valor'}</div>
                                </div>

                                <div className="metric">
                                    <div className="label">Valor Investido</div>
                                    <div className="value">{value.valor_investido ? value.valor_investido.toFixed(1) : 'Sem valor'}</div>
                                </div>
                                <div className="metric">
                                    <div className="label">Valor Atual</div>
                                    <div className="value">{value.valor_atual ? value.valor_atual.toFixed(1) : 'Sem valor'}</div>
                                </div>
                                <div className="metric" style={{ gridColumn: '1 / -1' }}>
                                    <div className="label">Variação (5 dias)</div>
                                    <div className="value" style={{ color: value.detalhes && value.detalhes.variacao_5d_percent >= 0 ? '#00b37e' : '#ff4d4f' }}>
                                        {value.detalhes && value.detalhes.variacao_5d_percent >= 0 ? '+' : ''}{value.detalhes && value.detalhes.variacao_5d_percent ? `${value.detalhes.variacao_5d_percent.toFixed(2)}%` : 'Sem Valor'}
                                    </div>
                                </div>
                            </MetricsGrid>
                        </DetailCard>
                    ))
                )}
            </WalletGrid>
        </Container>
    );
};

export default WalletPage;
