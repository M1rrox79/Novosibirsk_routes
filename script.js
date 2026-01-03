document.addEventListener('DOMContentLoaded', () => {

  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.display = 'none';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#fff';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '5px';
  modalContent.style.width = '300px';
  modalContent.style.boxSizing = 'border-box';
  modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Имя:';
  nameLabel.style.marginTop = '10px';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.required = true;

  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Телефон:';
  phoneLabel.style.marginTop = '10px';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.required = true;

  const routeLabel = document.createElement('label');
  routeLabel.textContent = 'Маршрут:';
  routeLabel.style.marginTop = '10px';
  const routeSelect = document.createElement('select');
  routeSelect.required = true;
  routeSelect.style.padding = '4px';

  const option1 = document.createElement('option');
  option1.value = 'Сердце Сибири - Площадь Ленина и НОВАТ';
  option1.textContent = 'Сердце Сибири - Площадь Ленина и НОВАТ';

  const option2 = document.createElement('option');
  option2.value = 'Прогулка по Тихому центру и Красному проспекту';
  option2.textContent = 'Прогулка по Тихому центру и Красному проспекту';

  const option3 = document.createElement('option');
  option3.value = 'Исследование Акадамгородка';
  option3.textContent = 'Исследование Акадамгородка';

  routeSelect.appendChild(option1);
  routeSelect.appendChild(option2);
  routeSelect.appendChild(option3);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'flex';
  buttonsDiv.style.justifyContent = 'space-between';
  buttonsDiv.style.marginTop = '20px';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Отправить';
  submitBtn.style.padding = '8px 12px';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Отмена';
  cancelBtn.style.padding = '8px 12px';

  buttonsDiv.appendChild(cancelBtn);
  buttonsDiv.appendChild(submitBtn);

  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(phoneLabel);
  form.appendChild(phoneInput);
  form.appendChild(routeLabel);
  form.appendChild(routeSelect);
  form.appendChild(buttonsDiv);

  modalContent.appendChild(form);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Создаем элемент для сообщения после отправки
  const successMessage = document.createElement('div');
  successMessage.style.display = 'none';
  successMessage.style.padding = '20px';
  successMessage.style.textAlign = 'center';
  successMessage.style.fontSize = '16px';
  successMessage.style.color = '#333';
  successMessage.textContent = 'Спасибо за регистрацию. Будем ждать вас в нашем приключении.';
  modalContent.appendChild(successMessage);

  // Показать модалку при клике на кнопку
  const buttons = document.querySelectorAll('.btn-signup');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.route) {
        routeSelect.value = btn.dataset.route;
      } else {
        routeSelect.value = '';
      }
      nameInput.value = '';
      phoneInput.value = '';
      form.style.display = 'flex';
      successMessage.style.display = 'none';
      modal.style.display = 'flex';
      nameInput.focus();
    });
  });

  // Отмена
  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const defaultSuccessText = 'Спасибо за регистрацию. Будем ждать вас в нашем приключении.';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const route = routeSelect.value.trim();

    if (!name || !phone || !route) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert('Пожалуйста, введите корректный номер телефона (только цифры, возможно + в начале, длина 10-15 символов).');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, route })
      });

      const result = await response.json();
      form.style.display = 'none';
      successMessage.style.display = 'block';

      if (result.success) {
        successMessage.textContent = defaultSuccessText;
      } else {
        successMessage.textContent = result.error; // Показываем сообщение о повторной регистрации
      }
    } catch (err) {
      alert('Не удалось отправить данные на сервер.');
      console.error(err);
    }
  });

  // Закрытие модалки при клике вне контента
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Прокрутка к разделу "Маршруты" при клике в header
  const routesLink = document.getElementById('routes-link');
  const routesSection = document.getElementById('routes');

  if (routesLink && routesSection) {
    routesLink.addEventListener('click', (e) => {
      e.preventDefault();
      routesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Inline overlay для "О проекте"
  const aboutLink = document.getElementById('about-link');

  if (aboutLink) {
    const overlay = document.createElement('div');
    overlay.textContent = 'Инфо о нашем проекте';
    overlay.style.position = 'absolute';
    overlay.style.backgroundColor = '#ffffff';
    overlay.style.color = '#333';
    overlay.style.padding = '12px 16px';
    overlay.style.borderRadius = '8px';
    overlay.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
    overlay.style.display = 'none';
    overlay.style.zIndex = '1002';
    overlay.style.minWidth = '220px';
    overlay.style.textAlign = 'center';

    document.body.appendChild(overlay);

    const showOverlay = () => {
      const rect = aboutLink.getBoundingClientRect();
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.top = `${rect.bottom + window.scrollY + 10}px`;
      overlay.style.display = 'block';
    };

    const hideOverlay = () => {
      overlay.style.display = 'none';
    };

    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (overlay.style.display === 'block') {
        hideOverlay();
      } else {
        showOverlay();
      }
    });

    document.addEventListener('click', (e) => {
      if (!aboutLink.contains(e.target) && !overlay.contains(e.target)) {
        hideOverlay();
      }
    });

    window.addEventListener('scroll', hideOverlay);
  }

  /*
  const aboutLink = document.getElementById('about-link');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Инфа о нашем проекте');
    });
  }
  */
});