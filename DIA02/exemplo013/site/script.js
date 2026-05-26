document.getElementById('meuBotao').addEventListener('click', function() {
    const mensagem = document.getElementById('mensagem');
    
    // Alterna a exibição da mensagem secreta
    if (mensagem.className === 'escondido') {
        mensagem.className = 'mostrando';
    } else {
        mensagem.className = 'escondido';
    }
});