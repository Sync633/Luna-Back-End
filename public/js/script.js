const menu = document.querySelector(".botao-menu");
const menuLateral = document.querySelector(".menu-lateral");
const conteudo = document.querySelector(".content");
const navPesquisa = document.querySelector(".nav-pesquisa");

menu.addEventListener("click", () => {
  menuLateral.classList.toggle("active");
  conteudo.classList.toggle("active");
  navPesquisa.classList.toggle("active");
});


// ALERTAS TELA HOME
const modal = document.querySelector('.modal-materia');
const mheader = document.querySelector('.modal-header');
const lgMateria = document.querySelector('.logo-materia');
const mbody = document.querySelector('.modal-body');
const btnFechar = document.querySelector('.fechar-modal');
const mShadown = document.querySelector('.modal-shadown');

function ativarModal() {
  modal.style.animation = "modalIn .5s"
  mShadown.style.animation = "shadownIn .5s"

  modal.style.display = "flex";
  mShadown.style.display = "block";
}

btnFechar.addEventListener("click", () => {
   modal.style.animation = "modalOut .5s"
   mShadown.style.animation = "shadownOut .5s"

    modal.addEventListener('animationend', function handler() {
        modal.style.display = "none";
        mShadown.style.display = "none";

        modal.removeEventListener('animationend', handler); 
    }, { once: true }); 
});

const modalE = document.querySelector('.modal-materiaE');
const mheaderE = document.querySelector('.modal-headerE');
const lgMateriaE = document.querySelector('.logo-materia');
const mbodyE = document.querySelector('.modal-bodyE');
const btnFecharE = document.querySelector('.fechar-modalE');
const mShadownE = document.querySelector('.modal-shadownE');

const botaoConfirmarM = document.getElementById("botaoConfirmarM");

function ativarModalM(codMateria) {
  botaoConfirmarM.href = `/home/deletar-materia/${codMateria}`;

  modalE.style.animation = "modalEIn .5s"
  mShadownE.style.animation = "shadownEIn .5s"

  modalE.style.display = "flex";
  mShadownE.style.display = "block";
}

function fecharModalM() {
   modalE.style.animation = "modalEOut .5s"
   mShadownE.style.animation = "shadownEOut .5s"

    modalE.addEventListener('animationend', function handler() {
        modalE.style.display = "none";
        mShadownE.style.display = "none";

        modalE.removeEventListener('animationend', handler); 
    }, { once: true }); 
}

btnFecharE.addEventListener("click", () => {
   modalE.style.animation = "modalEOut .5s"
   mShadownE.style.animation = "shadownEOut .5s"

    modalE.addEventListener('animationend', function handler() {
        modalE.style.display = "none";
        mShadownE.style.display = "none";

        modalE.removeEventListener('animationend', handler); 
    }, { once: true }); 
});

//calendario

document.addEventListener('DOMContentLoaded', function() {
  const monthYearEl = document.getElementById('month-year');
  const daysEl = document.getElementById('days');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  // const todayBtn = document.getElementById('today-btn');
  const eventDateEl = document.getElementById('event-date');
  const eventListEl = document.getElementById('event-list');

  let currentDate = new Date();
  let selectedDate = null;

  // Sample events data
  const events = {
    '2025-9-15': [
      { time: '10:00 AM', text: 'Team meeting' },
      { time: '02:30 PM', text: 'Project review' }
    ],
    '2025-9-20': [
      { time: '11:00 AM', text: 'Doctor appointment' }
    ],
    '2025-9-25': [
      { time: '07:00 PM', text: 'Birthday party' },
      { time: '09:00 PM', text: 'Dinner with friends' }
    ],
    '2025-10-2': [
      { time: '07:00 PM', text: 'Birthday party' }
    ],
    '2025-10-10': [
      { time: 'All day', text: 'Project deadline' }
    ],
    '2025-10-18': [
      { time: '12:00 PM', text: 'Lunch with client' },
      { time: '04:00 PM', text: 'Product demo' }
    ],
  };

  // Render calendar
  function renderCalendar() {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    monthYearEl.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    let days = "";

    // Previous month days
    for (let x = firstDayIndex; x > 0; x--) {
      const prevDate = prevLastDay.getDate() - x + 1;
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${prevDate}`;
      const hasEvent = events[dateKey] !== undefined;

      days += `<div class="day other-month${hasEvent ? ' has-events' : ''}">${prevDate}</div>`;
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
      const hasEvent = events[dateKey] !== undefined;

      let dayClass = 'day';

      if (
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        dayClass += ' today';
      }

      if (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        dayClass += ' selected';
      }

      if (hasEvent) {
        dayClass += ' has-events';
      }

      days += `<div class="${dayClass}" data-date="${dateKey}">${i}</div>`;
    }

    // Next month days
    for (let j = 1; j <= nextDays; j++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-${j}`;
      const hasEvent = events[dateKey] !== undefined;
      days += `<div class="day other-month${hasEvent ? ' has-events' : ''}">${j}</div>`;
    }

    daysEl.innerHTML = days;

    // Add click event to days
    document.querySelectorAll('.day:not(.other-month)').forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.getAttribute('data-date');
        const [year, month, dayNum] = dateStr.split('-').map(Number);
        selectedDate = new Date(year, month - 1, dayNum);
        renderCalendar();
        showEvents(dateStr);
      });
    });
  }

  // Show events for selected date
  function showEvents(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[dateObj.getDay()];

    eventDateEl.textContent = `${dayName}, ${months[dateObj.getMonth()]} ${day}, ${year}`;

    // Clear previous events
    eventListEl.innerHTML = '';

    if (events[dateStr]) {
      events[dateStr].forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
          <div class="event-color"></div>
          <div class="event-time">${event.time}</div>
          <div class="event-text">${event.text}</div>
        `;
        eventListEl.appendChild(eventItem);
      });
    } else {
      eventListEl.innerHTML = '<div class="no-events">No events scheduled for this day</div>';
    }
  }

  // Navigation buttons
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    eventDateEl.textContent = 'Select a date';
    eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here</div>';
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    eventDateEl.textContent = 'Select a date';
    eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here</div>';
  });


  // Initialize calendar
  renderCalendar();
});