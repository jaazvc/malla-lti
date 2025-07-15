fetch('plan.json')
  .then(response => response.json())
  .then(data => {
    const malla = document.getElementById('malla');
    data.ciclos.forEach(ciclo => {
      const div = document.createElement('div');
      div.className = 'ciclo';
      div.innerHTML = `<h2>Ciclo ${ciclo.numero}</h2>`;
      ciclo.cursos.forEach(curso => {
        const p = document.createElement('p');
        p.className = 'curso';
        p.textContent = `${curso.codigo} - ${curso.nombre} (${curso.creditos} créditos)` +
          (curso.prerequisito ? ` | Prerrequisito: ${curso.prerequisito}` : '');
        div.appendChild(p);
      });
      malla.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error cargando plan:', error);
  });