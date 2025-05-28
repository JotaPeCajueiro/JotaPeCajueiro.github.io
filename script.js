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
});
