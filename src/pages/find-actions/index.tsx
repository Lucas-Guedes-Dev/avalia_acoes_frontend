import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

import { type PrecoMaxAcao } from "../../utils/mock";
import {
    Container,
    BackButton,
    PageTitle,
    Subtitle,
    InputContainer,
    Input,
    Button,
    Select,
    CardsGrid,
    SimpleCard,
    EmptyState,
    Loader as LoaderSpinner
} from "../../globalStyles";
import ResultActions from "../../services/result-acions";
import { getTiposDisponiveis, SCREENER_CATEGORIAS, PAISES } from "../../utils/util";



const FindActions: React.FC = () => {
    const service = new ResultActions();
    const [maxPreco, setMaxPreco] = useState('');
    const [pais, setPais] = useState('');
    const [tipo, setTipo] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<PrecoMaxAcao[]>([]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);
    const navigate = useNavigate();
    const theme = useTheme();

    const tiposDisponiveis = getTiposDisponiveis(pais);

    useEffect(() => {
        if (tipo && pais) {
            const valido = Object.values(SCREENER_CATEGORIAS)
                .flat()
                .some(cat => cat.id === tipo && cat.paises.includes(pais));
            if (!valido) setTipo('');
        }
    }, [pais, tipo]);

    const handleBuscar = async () => {
        if (!maxPreco) return;
        setLoading(true);
        setResults([]);
        try {
            const response = await service.get(
                parseFloat(maxPreco),
                pais || undefined,
                tipo || undefined
            );
            setResults(response.acoes);
        } catch (error: any) {
            console.error(error);
            setResults([]);
            alert(error.response?.data?.detail || "Erro ao buscar ações");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectActions = (ticker: string) => {
        setSelectedActions(prev =>
            prev.includes(ticker)
                ? prev.filter(t => t !== ticker)
                : [...prev, ticker]
        );
    };

    return (
        <Container>
            <BackButton onClick={() => navigate('/home')}>
                <ArrowLeft size={16} /> Voltar
            </BackButton>

            <PageTitle>Buscar por Preço Máximo</PageTitle>
            <Subtitle>Encontre ações dentro do seu orçamento</Subtitle>

            <InputContainer>
                <Input
                    type="number"
                    value={maxPreco}
                    onChange={(e) => setMaxPreco(e.target.value)}
                    placeholder="Ex: 50.00"
                    step="0.01"
                />

                <Select
                    value={pais}
                    onChange={(e) => {
                        setPais(e.target.value);
                        setTipo(''); // reseta tipo ao mudar país
                    }}
                    style={{ margin: '8px 0' }}
                >
                    {PAISES.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                </Select>

                <Select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    style={{ margin: '8px 0' }}
                    disabled={!pais} // só habilita se país estiver selecionado
                >
                    <option value="">
                        {pais ? "Selecione um tipo" : "Primeiro selecione um país"}
                    </option>
                    {tiposDisponiveis.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </Select>

                <Button
                    onClick={handleBuscar}
                    disabled={loading || !maxPreco}
                    gradient={theme.gradients.info}
                >
                    {loading ? 'Buscando...' : 'Buscar Ações'}
                </Button>

                <div className="label" style={{ marginTop: '8px', fontSize: '0.9em', color: theme.colors.text }}>
                    {selectedActions.length > 0
                        ? `Selecionadas: ${selectedActions.join(', ')}`
                        : 'Clique em uma ação para selecionar'}
                </div>
            </InputContainer>

            {loading && <LoaderSpinner />}

            {results.length > 0 ? (
                <CardsGrid>
                    {results.map((acao, idx) => (
                        <SimpleCard
                            key={idx}
                            onClick={() => handleSelectActions(acao.ticker)}
                            gradient={
                                selectedActions.includes(acao.ticker)
                                    ? theme.gradients.primary
                                    : theme.gradients.info
                            }
                            style={{
                                cursor: 'pointer',
                                opacity: selectedActions.includes(acao.ticker) ? 1 : 0.9,
                                transform: selectedActions.includes(acao.ticker) ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <h3>{acao.ticker}</h3>
                            <div className="company">{acao.empresa}</div>
                            <div className="price">R$ {acao.preco_atual_brl?.toFixed(2) || 'N/D'}</div>
                            <div className="currency">
                                {acao.pais} • {acao.tipo_screener}
                            </div>
                        </SimpleCard>
                    ))}
                </CardsGrid>
            ) : (
                !loading && maxPreco && (
                    <EmptyState>
                        Nenhuma ação encontrada nessa faixa de preço.
                        {pais && ` (País: ${PAISES.find(p => p.value === pais)?.label})`}
                        {tipo && ` • Tipo: ${SCREENER_CATEGORIAS["Atividade e Volume"].concat(
                            SCREENER_CATEGORIAS["Desempenho Diário"],
                            SCREENER_CATEGORIAS["Small Caps e Crescimento"],
                            SCREENER_CATEGORIAS["Subvalorizadas"]
                        ).find(t => t.id === tipo)?.label}`}
                    </EmptyState>
                )
            )}
        </Container>
    );
};
export default FindActions;