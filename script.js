document.addEventListener('DOMContentLoaded', () => {
  // Создаем модальное окно
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
  option1.value = 'Исторические страницы Новосибирска';
  option1.textContent = 'Исторические страницы Новосибирска';

  const option2 = document.createElement('option');
  option2.value = 'Природные оазисы Новосибирска';
  option2.textContent = 'Природные оазисы Новосибирска';

  const option3 = document.createElement('option');
  option3.value = 'Гастрономические удовольствия';
  option3.textContent = 'Гастрономические удовольствия';

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

  // Обработка отправки формы
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const route = routeSelect.value.trim();

    if (!name || !phone || !route) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, route })
      });

      const result = await response.json();
      if (result.success) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
      } else {
        alert(result.error || 'Ошибка при сохранении данных.');
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
});