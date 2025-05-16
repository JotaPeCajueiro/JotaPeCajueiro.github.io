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
});
