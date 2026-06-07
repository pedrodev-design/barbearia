// ============================================================
// supabaseClient.js — L&M Atelier
// ============================================================

// 1. CREDENCIAIS DO PROJETO SUPABASE
const SUPABASE_URL = 'https://nainkyuxarosvzobecim.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v3ozcPn1RkZtbeFlzNGLjw_0oySVapR';

// Inicializa o cliente e sobrescreve window.supabase (SDK) com o client instance
// Isso garante que `supabase` no index.html resolva para o client, não o SDK.
try {
    const _sdk = window.supabase; // guarda referência ao SDK
    window.supabase = _sdk.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[Supabase] Cliente inicializado com sucesso:', SUPABASE_URL);
} catch (e) {
    console.error('[Supabase] Falha ao inicializar:', e);
    // Mock chainável como fallback
    const mockResponse = Promise.resolve({ data: null, error: { message: 'Supabase não inicializado' } });
    const mockChainable = {
        select: () => mockResponse,
        insert: () => mockChainable,
        update: () => mockChainable,
        delete: () => mockChainable,
        eq:     () => mockChainable,
        in:     () => mockChainable,
        order:  () => mockResponse,
        then:   (...a) => mockResponse.then(...a),
    };
    window.supabase = { from: () => mockChainable };
}

// ============================================================
// 2. DADOS PADRÃO (fallback caso o banco esteja vazio ou inacessível)
// ============================================================
const DEFAULT_SERVICES_LORENA = [
    { id: 1, category: 'lorena', name: 'Axila', desc: 'Remoção com cera de alta qualidade.', price: 20, time: 15 },
    { id: 2, category: 'lorena', name: 'Virilha completa', desc: 'Depilação íntima com máximo conforto e discrição.', price: 50, time: 35 },
    { id: 3, category: 'lorena', name: 'Perna inteira', desc: 'Depilação completa das pernas.', price: 50, time: 45 },
    { id: 4, category: 'lorena', name: 'Meia perna', desc: 'Depilação parcial da perna.', price: 30, time: 25 },
    { id: 5, category: 'lorena', name: 'Rosto', desc: 'Remoção de pelos faciais com cera suave.', price: 20, time: 20 },
    { id: 6, category: 'lorena', name: 'Buço', desc: 'Limpeza rápida e eficaz.', price: 10, time: 10 },
    { id: 7, category: 'lorena', name: 'Braço inteiro', desc: 'Depilação completa dos braços.', price: 20, time: 25 },
    { id: 8, category: 'lorena', name: 'Costas', desc: 'Depilação feminina das costas.', price: 20, time: 25 },
    { id: 9, category: 'lorena', name: 'Sobrancelha', desc: 'Design e limpeza de sobrancelhas.', price: 15, time: 15 }
];

const DEFAULT_SERVICES_MARCIO = [
    { id: 10, category: 'marcio', name: 'Barba', desc: 'Cuidado masculino para a barba com toalha quente.', price: 20, time: 30 },
    { id: 11, category: 'marcio', name: 'Corte', desc: 'Corte de cabelo masculino e infantil.', price: 20, time: 40 },
    { id: 12, category: 'marcio', name: 'Pelos do nariz e orelha', desc: 'Remoção indolor e precisa.', price: 20, time: 15 },
    { id: 13, category: 'marcio', name: 'Depilação costas', desc: 'Depilação com cera especial masculina.', price: 20, time: 25 },
    { id: 14, category: 'marcio', name: 'Depilação peito', desc: 'Depilação com cera especial masculina.', price: 20, time: 25 },
    { id: 15, category: 'marcio', name: 'Perna inteira', desc: 'Depilação completa das pernas.', price: 50, time: 45 },
    { id: 16, category: 'marcio', name: 'Parte íntima', desc: 'Depilação com total discrição e higiene.', price: 50, time: 45 },
    { id: 17, category: 'marcio', name: 'Combo depilação total', desc: 'Pacote completo: corpo total ou parcial.', price: 150, time: 120 },
    { id: 18, category: 'marcio', name: 'Matizador para Barba', desc: 'Realce a cor da sua barba.', price: 10, time: 15 },
    { id: 19, category: 'marcio', name: 'Mechas no Cabelo', desc: 'Estilo moderno e iluminado.', price: 50, time: 60 },
    { id: 20, category: 'marcio', name: 'Desenhos Freestyle', desc: 'Arte exclusiva em cortes.', price: 30, time: 30 }
];

const DEFAULT_REVIEWS = [
    { id: 1, name: 'Ana Maria G.', role: 'Cliente Studio Lorena', rating: 5, comment: 'Estou acostumada a fazer depilação e a Lorena é simplesmente genial. A cera que ela desenvolve não me dá foliculite e ela tem uma delicadeza que torna o momento super tolerável. O estúdio é impecável em termos de privacidade.', status: 'approved', initials: 'AM' },
    { id: 2, name: 'Rodrigo C.', role: 'Cliente Márcio Lounge', rating: 5, comment: 'Encontrei no Márcio o barbeiro ideal. Ele tem uma precisão na tesoura incrível para cortes clássicos e a barboterapia é de dormir de tão relaxante. Faço depilação no peito com ele e a discrição e eficácia são absolutas.', status: 'approved', initials: 'RC' },
    { id: 3, name: 'Valéria S.', role: 'Cliente Estética Atelier', rating: 5, comment: 'O L&M Atelier é diferenciado. O agendamento é super fluido e quando você chega é recebida de forma exclusiva com um bom espumante brut. Lorena cuidou do meu design de sobrancelhas e o resultado foi espetacular.', status: 'approved', initials: 'VS' }
];

// ============================================================
// 3. NOTIFICAÇÕES TELEGRAM (opcional)
// Para ativar: crie um bot com @BotFather e preencha abaixo.
// ============================================================
const TELEGRAM_BOT_TOKEN = '';
const TELEGRAM_CHAT_ID = '';

async function notifyLorena(title, message) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    const text = `🔔 *${title}*\n\n${message}`;
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' })
        });
    } catch (e) {
        console.error('Erro ao notificar Telegram:', e);
    }
}
