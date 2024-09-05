function openTab(event, tabName) {
    var i, tabcontent, tabbuttons;

    // Esconde todo o conteúdo das abas
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove a classe "active" de todos os botões
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // Mostra a aba atual e adiciona a classe "active" ao botão e ao conteúdo
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// Inicializa a aba padrão
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("masculino").style.display = "block";
});
