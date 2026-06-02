// Configuração das ações e canais de ajuda oficial
const canaisAjuda = {
    vazamento: {
        titulo: "🚨 Alerta de Vazamento de Dados",
        linkOficial: "https://www.gov.br",
        conselho: "CONSELHO DE EMERGÊNCIA (LGPD):\n1. Tire prints das informações e do local onde os dados estão expostos.\n2. Altere imediatamente todas as suas senhas importantes.\n3. Ative a verificação em duas etapas em suas contas.\n4. Registre uma reclamação oficial na ANPD usando o link que será aberto.",
        mensagemAlerta: "Você será direcionado para o canal oficial de denúncias da ANPD (Autoridade Nacional de Proteção de Dados).\n\nTambém copiamos as instruções de segurança para a sua área de transferência!"
    },
    ofensa: {
        titulo: "❌ Alerta de Crimes Virtuais / Ofensas",
        linkOficial: "https://www.gov.br",
        conselho: "CONSELHO DE EMERGÊNCIA (MARCO CIVIL):\n1. NÃO responda nem apague as ofensas.\n2. Tire capturas de tela (prints) com a data, hora e o link (URL) completo do perfil do agressor.\n3. Preserve as provas.\n4. Registre um Boletim de Ocorrência na Delegacia Eletrônica.",
        mensagemAlerta: "Você será direcionado para o portal de registro de Boletim de Ocorrência da Delegacia Eletrônica.\n\nAs instruções de como coletar as provas foram copiadas para a sua área de transferência!"
    }
};

// --- 1. LÓGICA DOS BOTÕES DE EMERGÊNCIA REAL ---
function executarAcaoEmergencia(tipo) {
    const canal = canaisAjuda[tipo];
    if (!canal) return;

    if (window.speechSynthesis) {
        window.speechSynthesis.cancel(); // Para o leitor de tela se estiver ativo
    }

    // Copia orientações para o "Ctrl+V" do usuário automaticamente
    navigator.clipboard.writeText(canal.conselho).catch(err => {
        console.error("Erro ao copiar instruções: ", err);
    });

    // Exibe pop-up informativo e abre o link oficial do governo
    alert(`${canal.titulo}\n\n${canal.mensagemAlerta}`);
    window.open(canal.linkOficial, '_blank', 'noopener,noreferrer');
}

// --- 2. LÓGICA DE ALTERAÇÃO DO TAMANHO DA FONTE ---
let tamanhoAtual = 16;
function alterarFonte(direcao) {
    tamanhoAtual += direcao * 2;
    // Evita extremos que quebram o layout do app
    if (tamanhoAtual < 12) tamanhoAtual = 12;
    if (tamanhoAtual > 26) tamanhoAtual = 26;
    document.documentElement.style.setProperty('--font-size-base', tamanhoAtual + 'px');
}

// --- 3. LÓGICA DE LEITURA EM VOZ ALTA (WEB SPEECH API) ---
let lendo = false;
const sintese = window.speechSynthesis;
let utterance;

function lerPagina() {
    const botaoAudio = document.getElementById('btn-audio');
    
    if (lendo) {
        sintese.cancel();
        lendo = false;
        botaoAudio.innerText = "🔊 Ler Página";
        return;
    }

    const textoParaLer = document.getElementById('conteudo-principal').innerText;
    utterance = new SpeechSynthesisUtterance(textoParaLer);
    utterance.lang = 'pt-BR';
    
    utterance.onend = () => {
        lendo = false;
        botaoAudio.innerText = "🔊 Ler Página";
    };

    botaoAudio.innerText = "🛑 Parar Leitura";
    lendo = true;
    sintese.speak(utterance);
}
