import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Button, ButtonGroup, ButtonRow, Card, CardActions, CardHeader, CardsGrid, Container, EmptyState, Form, FormGroup, IconButton, Input, Label, Loader, MetricsGrid, Modal, ModalContent, ModalHeader, PageTitle, Subtitle } from "./style";
import { Edit2, Plus, Trash2, TrendingUp } from "lucide-react";
import ActionService from "../../services/actions";
import type { ActionResponse, ActionUpdate } from "../../services/actions/types";

const ActionsCRUD: React.FC = () => {
    const service = new ActionService();
    const [actions, setActions] = useState<ActionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAction, setEditingAction] = useState<ActionUpdate | null>(null);
    const [formData, setFormData] = useState({
        ticker: '',
        company: '',
        value: '',
        ammount: ''
    });
    const theme = useTheme();

    const gradients = [
        theme.gradients.card1,
        theme.gradients.card2,
        theme.gradients.card3,
        theme.gradients.primary,
    ];

    useEffect(() => {
        loadActions();
    }, []);

    const loadActions = async () => {
        setLoading(true);
        try {
            const data = await service.list();
            setActions(data);
        } catch (error) {
            console.error('Erro ao carregar ações:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (action?: any) => {
        if (action) {
            setEditingAction(action);
            setFormData({
                ticker: action.ticker,
                company: action.company,
                value: action.value ? action.value.toString() : null,
                ammount: action.ammount ? action.ammount.toString() : null
            });
        } else {
            setEditingAction(null);
            setFormData({ ticker: '', company: '', value: '', ammount: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAction(null);
        setFormData({ ticker: '', company: '', value: '', ammount: '' });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const actionData = {
            ticker: formData.ticker,
            company: formData.company,
            value: parseFloat(formData.value),
            ammount: parseInt(formData.ammount)
        };

        try {
            if (editingAction) {
                await service.update(editingAction.id ? editingAction.id : 0, actionData);
            } else {
                await service.create(actionData);
            }
            await loadActions();
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao salvar ação:', error);
        } finally {
            loadActions()
        }
    };

    const handleDelete = async (id: any) => {
        if (window.confirm('Tem certeza que deseja excluir esta ação?')) {
            try {
                await service.delete(id);
                await loadActions();
            } catch (error) {
                console.error('Erro ao deletar ação:', error);
            } finally {
                loadActions()
            }
        }
    };

    const formatCurrency = (value: any) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <Container>
            <PageTitle>Minhas Ações</PageTitle>
            <Subtitle>Gerencie seu portfólio de investimentos</Subtitle>

            <ButtonGroup>
                <div></div>
                <Button gradient={theme.gradients.background} onClick={() => handleOpenModal()}>
                    <Plus size={20} />
                    Nova Ação
                </Button>
            </ButtonGroup>

            {loading ? (
                <Loader>
                    <div className="spinner" />
                </Loader>
            ) : actions.length === 0 ? (
                <EmptyState>
                    <TrendingUp />
                    <p>Nenhuma ação cadastrada ainda.</p>
                    <p>Clique em "Nova Ação" para começar!</p>
                </EmptyState>
            ) : (
                <CardsGrid>
                    {actions.map((action: any, index: any) => (
                        <Card key={action.id} gradient={gradients[index % gradients.length]}>
                            <CardHeader>
                                <div>
                                    <h3>{action.ticker}</h3>
                                    <div className="company">{action.company}</div>
                                </div>
                                <div className="price">{formatCurrency(action.value)}</div>
                            </CardHeader>

                            <MetricsGrid>
                                <div className="metric">
                                    <div className="label">Quantidade</div>
                                    <div className="value">{action.ammount}</div>
                                </div>
                                <div className="metric">
                                    <div className="label">Total Investido</div>
                                    <div className="value">{formatCurrency(action.value * action.ammount)}</div>
                                </div>
                            </MetricsGrid>

                            <CardActions>
                                <IconButton onClick={() => handleOpenModal(action)}>
                                    <Edit2 size={16} />
                                    Editar
                                </IconButton>
                                <IconButton className="delete" onClick={() => handleDelete(action.id)}>
                                    <Trash2 size={16} />
                                    Excluir
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </CardsGrid>
            )}

            {showModal && (
                <Modal onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <h2>{editingAction ? 'Editar Ação' : 'Nova Ação'}</h2>
                        </ModalHeader>

                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Ticker</Label>
                                <Input

                                    type="text"
                                    placeholder="Ex: PETR4"
                                    value={formData.ticker}
                                    onChange={(e) => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Empresa</Label>
                                <Input

                                    type="text"
                                    placeholder="Ex: Petrobras"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Valor Unitário (R$)</Label>
                                <Input

                                    type="number"
                                    step="0.01"
                                    placeholder="Ex: 38.50"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Quantidade</Label>
                                <Input

                                    type="number"
                                    placeholder="Ex: 100"
                                    value={formData.ammount}
                                    onChange={(e) => setFormData({ ...formData, ammount: e.target.value })}
                                    required
                                />
                            </FormGroup>

                            <ButtonRow>
                                <Button
                                    type="button"
                                    gradient="linear-gradient(135deg, #666 0%, #888 100%)"
                                    onClick={handleCloseModal}
                                    style={{ flex: 1 }}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" style={{ flex: 1 }}>
                                    {editingAction ? 'Salvar' : 'Cadastrar'}
                                </Button>
                            </ButtonRow>
                        </Form>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
}

export default ActionsCRUD;