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

});
