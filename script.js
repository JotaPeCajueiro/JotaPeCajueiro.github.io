// Espera o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona todos os botões dentro da navegação <nav>
    const menuButtons = document.querySelectorAll('nav button');

    // Seleciona todas as seções de conteúdo dentro da div #content-area
    const contentSections = document.querySelectorAll('#content-area .content-section');

    // Seleciona a área de conteúdo principal
    const contentArea = document.getElementById('content-area');

    // Função para mostrar o conteúdo baseado no ID
    function showContent(contentId) {
        // Esconde todas as seções primeiro
        contentSections.forEach(section => {
            // Remove a classe 'active' para garantir que a animação funcione novamente
            section.classList.remove('active');
            // Esconde a seção (redundante se usar a classe 'active', mas seguro)
            section.style.display = 'none';
        });

        // Encontra a seção específica que deve ser mostrada
        const sectionToShow = document.getElementById(contentId);

        // Se a seção existir...
        if (sectionToShow) {
             // Garante que a área de conteúdo está visível (caso tenha sido escondida)
            contentArea.style.display = 'block';
            // Mostra a seção desejada
            sectionToShow.style.display = 'block';
            // Adiciona a classe 'active' para ativar a animação CSS e confirmar visibilidade
            // Usar setTimeout garante que o display:block seja aplicado ANTES da classe ser add,
            // permitindo a animação ocorrer corretamente após re-exibição.
            setTimeout(() => {
                sectionToShow.classList.add('active');
            }, 10); // Pequeno delay
        } else {
            // Se nenhuma seção corresponder, esconde a área de conteúdo
            contentArea.style.display = 'none';
        }
    }

    // Adiciona um ouvinte de evento de clique para cada botão do menu
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Pega o valor do atributo 'data-content-id' do botão clicado
            const contentId = this.dataset.contentId;
            // Chama a função para mostrar o conteúdo correspondente
            showContent(contentId);
        });
    });

    // Opcional: Esconder a área de conteúdo inicialmente se nenhum item for selecionado
    // contentArea.style.display = 'none';
    // Ou mostrar a primeira seção por padrão:
    // if (menuButtons.length > 0) {
    //     showContent(menuButtons[0].dataset.contentId);
    // } else {
         contentArea.style.display = 'none'; // Esconde se não houver botões
    // }
 // --- NOVO CÓDIGO PARA O MODO NOTURNO ---
 const themeToggleButton = document.getElementById('theme-toggle-button');
 const body = document.body;
 const storageKey = 'camilaSiteTheme'; // Chave única para este site

 // Função para aplicar o tema e atualizar o botão
 function applyTheme(theme) {
     if (theme === 'dark') {
         body.classList.add('dark-mode');
         themeToggleButton.textContent = '☀️'; // Ícone de Sol
         themeToggleButton.setAttribute('aria-label', 'Ativar modo claro');
     } else {
         body.classList.remove('dark-mode');
         themeToggleButton.textContent = '🌙'; // Ícone de Lua
         themeToggleButton.setAttribute('aria-label', 'Ativar modo escuro');
     }
 }

 // Verifica se há um tema salvo no localStorage ao carregar a página
 const savedTheme = localStorage.getItem(storageKey);

 if (savedTheme) {
     // Aplica o tema salvo
     applyTheme(savedTheme);
 } else {
      // Opcional: Poderia verificar a preferência do sistema operacional aqui
      // Por simplicidade, vamos definir o modo escuro como padrão se nada for salvo
      applyTheme('dark');
 }


 // Adiciona o evento de clique ao botão de tema
 themeToggleButton.addEventListener('click', () => {
     // Verifica qual será o NOVO tema (o oposto do atual)
     let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';

     // Aplica o novo tema visualmente e atualiza o botão
     applyTheme(newTheme);

     // Salva a nova preferência no localStorage
     localStorage.setItem(storageKey, newTheme);
 });
 // --- FIM DO CÓDIGO PARA MODO NOTURNO ---
   // --- LÓGICA DO QUIZ ---
   const quizForm = document.getElementById('camilaQuiz');
   const quizResultArea = document.getElementById('quizResult');
   const scoreMessage = document.getElementById('scoreMessage');
   const detailedFeedback = document.getElementById('detailedFeedback');

   // !! IMPORTANTE: Personalize as respostas corretas aqui !!
   const correctAnswers = {
       q1: 'a',
       q2: 'c',
       q3: 'b',
       q4: 'b'
   };

   // !! IMPORTANTE: Personalize as mensagens de feedback aqui !!
   const feedbackMessages = [
       { score: 0, message: "Hmm, parece que precisamos conversar mais sobre nossos momentos! 😉 Mas o importante é o amor!", feedback: "Não desanime, o amor está no ar!" },
       { score: 1, message: "Você acertou uma! Já é um começo brilhante como nosso amor! ✨", feedback: "Continue tentando, cada acerto é uma estrela a mais no nosso céu!" },
       { score: 2, message: "Duas certas! Estamos em sintonia, mas ainda há mistérios a desvendar! ❤️", feedback: "Estamos quase lá, nosso laço é forte!" },
       { score: 3, message: "Uau, três acertos! 😍 Isso merece um beijo!", feedback: "Você é incrível, conhece os detalhes do nosso amor!" },
       { score: 4, message: "🎉Você acertou todas! Te amo demais!", feedback: "Nossa sintonia é mágica, alma gêmea detectada!" }
   ];

   if (quizForm) {
       quizForm.addEventListener('submit', function(event) {
           event.preventDefault();

           let score = 0;
           const formData = new FormData(quizForm);
           let allAnswered = true;
           let questionCount = 0;

           // PRIMEIRO: Limpar classes de feedback anteriores de TODAS as labels
           document.querySelectorAll('.quiz-question label').forEach(label => {
               label.classList.remove('correct-answer', 'wrong-answer');
           });

           for (const questionName in correctAnswers) { // ex: q1, q2, q3, q4
               questionCount++;
               const userAnswer = formData.get(questionName); // Pega o valor do radio selecionado para esta pergunta
               const correctAnswerValue = correctAnswers[questionName];

               if (!userAnswer) { // Se o usuário não respondeu (apesar do 'required')
                   allAnswered = false;
                   continue; // Pula para a próxima pergunta sem dar feedback visual para esta
               }

               // Encontra o input de rádio específico que o usuário selecionou para esta pergunta
               const selectedInputElement = quizForm.querySelector(`input[name="${questionName}"][value="${userAnswer}"]`);

               if (selectedInputElement) {
                   const selectedLabelElement = selectedInputElement.closest('label'); // Pega a label pai do input selecionado
                   if (selectedLabelElement) {
                       if (userAnswer === correctAnswerValue) {
                           selectedLabelElement.classList.add('correct-answer'); // Marca a selecionada como correta
                           score++;
                       } else {
                           selectedLabelElement.classList.add('wrong-answer'); // Marca a selecionada como errada
                           // NÃO marca mais a correta automaticamente
                       }
                   }
               }
           }

           if (!allAnswered && questionCount > 0) {
               alert("Por favor, responda a todas as perguntas antes de ver o resultado!");
               quizResultArea.style.display = 'none'; // Esconde o resultado se não respondeu tudo
               return;
           }

           // Exibe a mensagem de resultado com base na pontuação
           let resultText = `Você acertou ${score} de ${questionCount} perguntas!`;
           let feedbackText = "";

           if (questionCount === 0) {
               resultText = "O quiz ainda não tem perguntas!";
               feedbackText = "Adicione algumas perguntas e respostas no código. 😉";
           } else {
               const finalFeedback = feedbackMessages.find(fb => fb.score === score);
               if (finalFeedback) {
                   resultText = finalFeedback.message;
                   feedbackText = finalFeedback.feedback;
               } else {
                   // Fallback se não houver mensagem exata para a pontuação
                   if (score === questionCount) { // Se acertou tudo
                       const bestFeedback = feedbackMessages[feedbackMessages.length -1] || {message: resultText, feedback: "Parabéns!"};
                       resultText = bestFeedback.message;
                       feedbackText = bestFeedback.feedback;
                   } else if (score === 0 && feedbackMessages.length > 0) { // Se errou tudo e tem mensagem para score 0
                       const zeroFeedback = feedbackMessages[0];
                       resultText = zeroFeedback.message;
                       feedbackText = zeroFeedback.feedback;
                   }
                   // Se não, o resultText padrão (X de Y) e um feedback genérico serão usados
                    else if (!finalFeedback) {
                       feedbackText = "Continue tentando da próxima vez!";
                   }
               }
           }

           scoreMessage.textContent = resultText;
           detailedFeedback.textContent = feedbackText;
           quizResultArea.style.display = 'block';
       });
   }

   // Função para salvar o cookie
    function salvarDados(ultimaData) {
        let d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = "ultima_visita=" + ultimaData + ";expires=" + d.toUTCString() + ";path=/";
    }

    // Função para ler o cookie
    function lerCookie() {
        let nome = "ultima_visita=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nome) == 0) return c.substring(nome.length, c.length);
        }
        return "";
    }

    // Função que faz o pop-up sumir suavemente
    function fecharComFade() {
        const popup = document.getElementById("caixa-popup");
        popup.classList.add('popup-escondido');
        
        // Remove do HTML de vez após a animação de 0.5s acabar
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }

    // Inicialização ao carregar a página
    window.addEventListener('DOMContentLoaded', () => {
    const msgElemento = document.getElementById("mensagem-visita");
    const popup = document.getElementById("caixa-popup");

    let hoje = new Date();
    let hora = hoje.getHours();
    let saudacao = "";

    // Lógica da Saudação
    if (hora >= 5 && hora < 12) saudacao = "Bom dia, amor! ☀️";
    else if (hora >= 12 && hora < 18) saudacao = "Boa tarde, vida! ☕";
    else if (hora >= 18 && hora < 24) saudacao = "Boa noite, linda! ✨";
    else saudacao = "Ainda acordada, princesa? 🌙";

    let dataHoje = hoje.toLocaleDateString('pt-BR');
    let dataAnterior = lerCookie();

    // Monta o texto centralizado
    if (dataAnterior !== "") {
        msgElemento.innerHTML = `<strong style="color: var(--accent-color); display: block; margin-bottom: 10px; font-size: 1.2rem;">${saudacao}</strong>Sua última visita foi dia <b>${dataAnterior}</b>.`;
    } else {
        msgElemento.innerHTML = `<strong style="color: var(--accent-color); display: block; margin-bottom: 10px; font-size: 1.2rem;">${saudacao}</strong>Bem-vinda ao nosso cantinho! ❤️`;
    }

    // 1. Prepara o conteúdo e mostra o container (ainda transparente)
popup.style.display = "flex";

// 2. Pequeno delay para a animação de entrada (fade-in) funcionar
setTimeout(() => {
    popup.classList.add('popup-visivel');
}, 100);

// 3. O Temporizador de 6 segundos para SUMIR
setTimeout(() => {
    // Remove a classe de visibilidade (inicia o fade-out)
    popup.classList.remove('popup-visivel');
    
    // 4. Depois que a animação de saída acabar (0.8s), remove do display
    setTimeout(() => {
        popup.style.display = 'none';
    }, 800);
}, 6000); 

// Salva os dados do dia
salvarDados(dataHoje);
});
    const dataInicio = new Date(2024, 0, 14, 16, 0, 0); // Exemplo: 14 de Janeiro de 2024 às 16h

    function atualizarContador() {
        const agora = new Date();
        
        let anos = agora.getFullYear() - dataInicio.getFullYear();
        let meses = agora.getMonth() - dataInicio.getMonth();
        let dias = agora.getDate() - dataInicio.getDate();

        // Ajuste para quando o dia/mês atual é menor que o de início
        if (dias < 0) {
            meses--;
            let ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
        }
        if (meses < 0) {
            anos--;
            meses += 12;
        }

        // Cálculo de Horas, Minutos e Segundos
        const diffMs = agora - new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), dataInicio.getHours(), dataInicio.getMinutes(), dataInicio.getSeconds());
        
        // Se o horário de hoje ainda não passou o horário de início, ajustamos os dias
        let totalSegundos = Math.floor((agora - dataInicio) / 1000);
        let horas = Math.floor((totalSegundos / 3600) % 24);
        let minutos = Math.floor((totalSegundos / 60) % 60);
        let segundos = Math.floor(totalSegundos % 60);

        // Montando o texto com plural/singular inteligente
        let textoAnos = anos > 0 ? `<span>${anos}</span> ${anos === 1 ? 'ano' : 'anos'} ` : "";
        let textoMeses = meses > 0 ? `<span>${meses}</span> ${meses === 1 ? 'mês' : 'meses'} ` : "";
        let textoDias = dias > 0 ? `<span>${dias}</span> ${dias === 1 ? 'dia' : 'dias'} ` : "";
        
        document.getElementById("timer").innerHTML = 
            textoAnos + textoMeses + textoDias + "<br>" +
            `<span>${horas}</span>h <span>${minutos}</span>m <span>${segundos}</span>s`;
    }

    setInterval(atualizarContador, 1000);
    atualizarContador();
  function criarUmCoracao() {
        const container = document.getElementById('hearts-container');
        if (!container) return;

        const coracao = document.createElement('div');
        coracao.className = 'heart-snowflake';
        coracao.innerHTML = '❤️'; 

        const posX = Math.random() * 95; // 95 para não criar barra de rolagem lateral
        const duracao = 4 + Math.random() * 6;
        const tamanho = 20 + Math.random() * 20;

        coracao.style.left = posX + 'vw';
        coracao.style.fontSize = tamanho + 'px';
        coracao.style.animationDuration = duracao + 's';
        
        container.appendChild(coracao);

        setTimeout(() => { coracao.remove(); }, duracao * 1000);
    }

    let intervaloNeve = null;

    // Função que o botão vai chamar
    function toggleTeste() {
        const btn = document.getElementById('teste-coracoes');
        
        if (!intervaloNeve) {
            console.log("Iniciando neve...");
            intervaloNeve = setInterval(criarUmCoracao, 300);
        } else {
            console.log("Parando neve...");
            clearInterval(intervaloNeve);
            intervaloNeve = null;
            document.getElementById('hearts-container').innerHTML = '';
        }
    }

    // Vincula o clique assim que a página carregar
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('teste-coracoes');
        if (btn) {
            btn.onclick = toggleTeste;
        } else {
            console.error("Botão de teste não encontrado no HTML!");
        }
    });

    const CHAVE_CODIFICADA = "QUl6YVN5Q1dpbkRvbFhTVVQ0UmhpTFd1TUI5bkRLSWhKVjd4TlF3"; 

    function pegarChave() {
    // Isso decodifica a chave apenas na hora de usar
    return atob(CHAVE_CODIFICADA); 
}
  
async function falarComGemini(perguntaUsuario) {
    const API_KEY = pegarChave();
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`;

    const corpoRequisicao = {
        contents: [{
            parts: [{
                text: "Instrução: Você é o assistente romântico do site do João e da Camila. Responda com carinho e emojis. Pergunta: " + perguntaUsuario
            }]
        }]
    };

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpoRequisicao)
        });

        const dados = await resposta.json();

        if (dados.error) {
            if (dados.error.code === 429) {
                return "Calma, respira! ❤️ Mandei muitas mensagens seguidas. Espera um minutinho?";
            }
            console.error("Erro Google:", dados.error);
            return "Tive um probleminha técnico aqui... Tenta de novo? ✨";
        }

        return dados.candidates[0].content.parts[0].text;

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        return "Ih, perdi a conexão com o coração! Verifique se está online. 💔";
    }
}
// Lógica para enviar quando clicar no botão
document.getElementById("btn-enviar").onclick = async () => {
    const input = document.getElementById("chat-input");
    const containerMsg = document.getElementById("chat-mensagens");
    
    if (input.value.trim() === "") return;

    // 1. Mostra a pergunta dela (Formato Bolha Direita)
    containerMsg.innerHTML += `
        <div class="msg-container msg-camila-container">
            <div class="msg-bubble msg-camila">
                <span class="msg-autor"><b>Camila</b></span>
                ${input.value}
            </div>
        </div>
    `;
    const pergunta = input.value;
    input.value = "";

    // 2. Chama a IA
    const respostaIA = await falarComGemini(pergunta);

    // 3. Mostra resposta da IA (Formato Bolha Esquerda)
    containerMsg.innerHTML += `
        <div class="msg-container msg-ia-container">
            <div class="msg-bubble msg-ia">
                <span class="msg-autor"><b>Assistente ✨</b></span>
                ${respostaIA}
            </div>
        </div>
`;
    containerMsg.scrollTop = containerMsg.scrollHeight; // Rola para baixo
};

function toggleChat() {
    console.log("Cliquei no botão!"); // Se isso não aparecer no F12, o erro é no HTML
    const chat = document.getElementById("chat-container");
    
    if (chat) {
        chat.classList.toggle("aberto");
        console.log("Classe 'aberto' alternada!");
    } else {
        console.error("Não encontrei o elemento #chat-container");
    }
}

// Garanta que a função esteja disponível globalmente
window.toggleChat = toggleChat;

// EXTRA: Fechar ao apertar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const chat = document.getElementById("chat-container");
        if (!chat.classList.contains("chat-hidden")) toggleChat();
    }
});

// Garanta que o botão enviar continue funcionando como antes!

});
