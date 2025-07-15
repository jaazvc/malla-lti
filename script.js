fetch('plan.json')
  .then(response => response.json())
  .then(data => {
    const malla = document.getElementById('malla');
    const completados = JSON.parse(localStorage.getItem('completados')) || [];

    function guardarProgreso() {
      localStorage.setItem('completados', JSON.stringify(completados));
    }

    data.ciclos.forEach(ciclo => {
      const div = document.createElement('div');
      div.className = 'ciclo';
      div.innerHTML = `<h2>Ciclo ${ciclo.numero}</h2>`;

      ciclo.cursos.forEach(curso => {
        const p = document.createElement('p');
        p.className = 'curso';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = completados.includes(curso.codigo);
        input.onchange = () => {
          if (input.checked) {
            completados.push(curso.codigo);
          } else {
            const index = completados.indexOf(curso.codigo);
            if (index > -1) completados.splice(index, 1);
          }
          guardarProgreso();
          location.reload();
        };

        // Verifica prerrequisitos
        let habilitado = true;
        if (curso.prerequisito && !completados.includes(curso.prerequisito)) {
          habilitado = false;
          input.disabled = true;
        }

        p.appendChild(input);
        p.innerHTML += ` ${curso.codigo} - ${curso.nombre} (${curso.creditos} cr.)`;
        if (input.checked) {
          p.style.textDecoration = 'line-through';
          p.style.color = '#999';
        } else if (!habilitado) {
          p.style.color = '#aaa';
        }
        div.appendChild(p);
      });

      malla.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error cargando plan:', error);
  });
