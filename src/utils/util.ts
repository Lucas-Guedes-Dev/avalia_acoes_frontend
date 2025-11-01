export const SCREENER_CATEGORIAS = {
    "Atividade e Volume": [
        { id: "most_actives", label: "Mais Ativas (Global)", paises: ["United States", "Brazil", "Canada"] },
        { id: "most_actives_br", label: "Mais Ativas (Brasil)", paises: ["Brazil"] },
        { id: "most_actives_europe", label: "Mais Ativas (Europa)", paises: ["Germany", "France", "United Kingdom"] }
    ],
    "Desempenho Diário": [
        { id: "day_gainers", label: "Maiores Altas Hoje (Global)", paises: ["United States", "Brazil"] },
        { id: "day_gainers_br", label: "Maiores Altas (Brasil)", paises: ["Brazil"] },
        { id: "day_losers", label: "Maiores Quedas Hoje (Global)", paises: ["United States", "Brazil"] }
    ],
    "Small Caps e Crescimento": [
        { id: "aggressive_small_caps", label: "Small Caps Agressivas", paises: ["United States"] },
        { id: "small_cap_gainers", label: "Small Caps em Alta", paises: ["United States"] }
    ],
    "Subvalorizadas": [
        { id: "undervalued_growth_stocks", label: "Crescimento Subvalorizado", paises: ["United States"] },
        { id: "undervalued_large_caps", label: "Large Caps Subvalorizadas", paises: ["United States"] }
    ]
};

export const PAISES = [
    { value: "", label: "Todos os países" },
    { value: "Brazil", label: "Brasil" },
    { value: "United States", label: "Estados Unidos" },
    { value: "Canada", label: "Canadá" },
    { value: "Germany", label: "Alemanha" },
    { value: "France", label: "França" },
    { value: "United Kingdom", label: "Reino Unido" },
];


export const getTiposDisponiveis = (paisSelecionado: string): { value: string; label: string }[] => {
    const todosTipos: { value: string; label: string }[] = [];

    Object.values(SCREENER_CATEGORIAS).flat().forEach(categoria => {
        if (!paisSelecionado || categoria.paises.includes(paisSelecionado)) {
            todosTipos.push({ value: categoria.id, label: categoria.label });
        }
    });

    // Ordenar alfabeticamente
    return todosTipos.sort((a, b) => a.label.localeCompare(b.label));
};