fetch('plan.json')
  .then(response => response.json())
  .then(data => {
    const malla = document.getElementById('malla');
    let completados = JSON.parse(localStorage.getItem('completados')) || [];

    function guardarProgreso() {
      localStorage.setItem('completados', JSON.stringify(completados));
    }

    function render() {
      malla.innerHTML = ''; // Limpiar todo antes de volver a pintar

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

          // Deshabilitar si no cumple prerrequisito
          let habilitado = true;
          if (curso.prerequisito && !completados.includes(curso.prerequisito)) {
            habilitado = false;
            input.disabled = true;
          }

          input.onchange = () => {
            if (input.checked) {
              if (!completados.includes(curso.codigo)) {
                completados.push(curso.codigo);
              }
            } else {
              completados = completados.filter(c => c !== curso.codigo);
            }
            guardarProgreso();
            render(); // Redibuja sin recargar la página
          };

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
    }

    render(); // Pintar la primera vez
  })
  .catch(error => {
    console.error('Error cargando plan:', error);
  });
