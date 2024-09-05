// Função para calcular a gordura corporal e TMB
function calcular(genero) {
    let estatura, circNK, circAbs, circQd, idade, weight, resultadoGordura, resultadoTMB;

    if (genero === 'masculino') {
        estatura = parseFloat(document.querySelector('#masculino [name="estatura"]').value);
        circNK = parseFloat(document.querySelector('#masculino [name="circNK"]').value);
        circAbs = parseFloat(document.querySelector('#masculino [name="circAbs"]').value);
        idade = parseFloat(document.querySelector('#masculino [name="idade"]').value);
        weight = parseFloat(document.querySelector('#masculino [name="weight"]').value);

        // Fórmula para gordura corporal masculina
        resultadoGordura = (85.20969 * Math.log10(circAbs - circNK)) - (69.73016 * Math.log10(estatura)) + 37.26673;

        // Fórmula para TMB masculina
        resultadoTMB = 66.4730 + (13.7516 * weight) + (5.0033 * estatura) - (6.7550 * idade);

    } else if (genero === 'feminino') {
        estatura = parseFloat(document.querySelector('#feminino [name="estatura"]').value);
        circNK = parseFloat(document.querySelector('#feminino [name="circNK"]').value);
        circAbs = parseFloat(document.querySelector('#feminino [name="circAbs"]').value);
        circQd = parseFloat(document.querySelector('#feminino [name="circQd"]').value);
        idade = parseFloat(document.querySelector('#feminino [name="idade"]').value);
        weight = parseFloat(document.querySelector('#feminino [name="weight"]').value);

        // Fórmula para gordura corporal feminina
        resultadoGordura = (161.27327 * Math.log10((circAbs + circQd - circNK) / 2.54)) - (100.81032 * Math.log10(estatura / 2.54)) - 69.55016;

        // Fórmula para TMB feminina
        resultadoTMB = 655.0955 + (9.5634 * weight) + (1.8496 * estatura) - (4.6756 * idade);
    }

    // Atualiza o resultado de gordura corporal no HTML
    document.getElementById('resultadoGordura').textContent = resultadoGordura.toFixed(2) + '%';

    // Atualiza o resultado de TMB no HTML
    document.getElementById('resultadoTMB').textContent = resultadoTMB.toFixed(2) + ' cal';

    // Scroll para a seção "stats"
    document.getElementById('status').scrollIntoView({ behavior: 'smooth' });
}
