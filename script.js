// Data structure
let agendaData = {
    year: 2025,
    pages: [
        { id: 0, title: '📋 Portada', type: 'portada', canDelete: false },
        { id: 1, title: '📚 Índice', type: 'indice', canDelete: false },
        { id: 2, title: '👤 Datos Personales', type: 'datos', canDelete: false },
        { id: 3, title: '📅 Calendario 2025', type: 'calendario', canDelete: false },
        { id: 4, title: '🎂 Calendario Cumpleaños', type: 'cumpleanos', canDelete: false },
        { id: 5, title: '📝 Calendario Evaluación', type: 'evaluacion', canDelete: false },
        { id: 6, title: '🎉 Calendario Eventos', type: 'eventos', canDelete: false },
        { id: 7, title: '📖 Enero', type: 'monthly', canDelete: false, month: 'Enero' },
        { id: 8, title: '🌸 Febrero', type: 'monthly', canDelete: false, month: 'Febrero' },
        { id: 9, title: '🌱 Marzo', type: 'monthly', canDelete: false, month: 'Marzo' },
        { id: 10, title: '🌷 Abril', type: 'monthly', canDelete: false, month: 'Abril' },
        { id: 11, title: '🌺 Mayo', type: 'monthly', canDelete: false, month: 'Mayo' },
        { id: 12, title: '☀️ Junio', type: 'monthly', canDelete: false, month: 'Junio' },
        { id: 13, title: '🌻 Julio', type: 'monthly', canDelete: false, month: 'Julio' },
        { id: 14, title: '🌿 Agosto', type: 'monthly', canDelete: false, month: 'Agosto' },
        { id: 15, title: '🍂 Septiembre', type: 'monthly', canDelete: false, month: 'Septiembre' },
        { id: 16, title: '🍁 Octubre', type: 'monthly', canDelete: false, month: 'Octubre' },
        { id: 17, title: '❄️ Noviembre', type: 'monthly', canDelete: false, month: 'Noviembre' },
        { id: 18, title: '🎄 Diciembre', type: 'monthly', canDelete: false, month: 'Diciembre' },
        { id: 19, title: '⏰ Horario de Clases', type: 'horario', canDelete: false },
        { id: 20, title: '📚 Lista de Lectura', type: 'lectura', canDelete: false },
        { id: 21, title: '🎯 Objetivos 2025', type: 'objetivos', canDelete: false },
        { id: 22, title: '📋 Organizador Semanal', type: 'semanal', canDelete: false }
    ],
    datos: {
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        otros: ''
    },
    cumpleanos: {},
    evaluaciones: [],
    eventos: {},
    monthly: {},
    horario: {},
    lectura: [],
    objetivos: [],
    semanal: {},
    pageCounters: {}
};

let currentPage = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateIndice();
    bindFormEvents();
    generateCalendar2025();
    generateBirthdayCalendar();
    generateEventsCalendar();
    generateMonthlyPages();
    generateSchedule();
    renderReadingList();
    renderGoalsList();
    renderWeeklyOrganizer();
    renderEvaluationList();
    updateDeleteButton();
    
    // CORRECCIÓN: Asegurar que los datos se carguen específicamente para el organizador semanal
    setTimeout(() => {
        loadWeeklyOrganizerData();
    }, 100);
});

// NUEVA FUNCIÓN para cargar específicamente los datos del organizador semanal
function loadWeeklyOrganizerData() {
    if (!agendaData.semanal) return;
    
    const fields = ['notas', 'importante', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    fields.forEach(field => {
        const element = document.getElementById(`weekly-${field}`);
        if (element && agendaData.semanal[field]) {
            element.value = agendaData.semanal[field];
            console.log(`Cargando ${field}: ${agendaData.semanal[field]}`); // Para debug
        }
    });
}

// Calendar generation
function generateCalendar2025() {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const calendarYear = document.querySelector('.calendar-year');
    
    if (!calendarYear) return;

    calendarYear.innerHTML = '';

    months.forEach((month, monthIndex) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'calendar-month';
        
        const monthTitle = document.createElement('h3');
        monthTitle.textContent = month;
        monthDiv.appendChild(monthTitle);
        
        const gridDiv = document.createElement('div');
        gridDiv.className = 'calendar-grid';
        
        // Add day headers
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            gridDiv.appendChild(dayHeader);
        });
        
        // Calculate days for this month
        const firstDay = new Date(2025, monthIndex, 1);
        const lastDay = new Date(2025, monthIndex + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            gridDiv.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = day;
            
            // Highlight today
            const today = new Date();
            if (today.getFullYear() === 2025 && today.getMonth() === monthIndex && today.getDate() === day) {
                dayDiv.classList.add('today');
            }
            
            gridDiv.appendChild(dayDiv);
        }
        
        monthDiv.appendChild(gridDiv);
        calendarYear.appendChild(monthDiv);
    });
}

function generateMiniCalendar(containerId, monthIndex) {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = `
        <h4>${months[monthIndex]} 2025</h4>
        <div class="calendar-grid" id="${containerId}-grid"></div>
    `;
    
    const gridDiv = document.getElementById(`${containerId}-grid`);
    
    // Add day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        gridDiv.appendChild(dayHeader);
    });
    
    // Calculate days for this month
    const firstDay = new Date(2025, monthIndex, 1);
    const lastDay = new Date(2025, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        gridDiv.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        const today = new Date();
        if (today.getFullYear() === 2025 && today.getMonth() === monthIndex && today.getDate() === day) {
            dayDiv.classList.add('today');
        }
        
        gridDiv.appendChild(dayDiv);
    }
}

// Birthday Calendar
function generateBirthdayCalendar() {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const birthdayCalendar = document.querySelector('.birthday-calendar');
    if (!birthdayCalendar) return;

    birthdayCalendar.innerHTML = '';

    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'birthday-month';
        
        monthDiv.innerHTML = `
            <h3>🎂 ${month}</h3>
            <div class="birthday-form">
                <input type="text" placeholder="Nombre" id="birthday-name-${index}">
                <input type="number" placeholder="Día" min="1" max="31" id="birthday-day-${index}">
                <button onclick="addBirthday(${index})">+</button>
            </div>
            <ul class="birthday-list" id="birthday-list-${index}"></ul>
        `;
        
        birthdayCalendar.appendChild(monthDiv);
    });

    renderBirthdays();
}

function addBirthday(monthIndex) {
    const nameInput = document.getElementById(`birthday-name-${monthIndex}`);
    const dayInput = document.getElementById(`birthday-day-${monthIndex}`);
    
    const name = nameInput.value.trim();
    const day = parseInt(dayInput.value);
    
    if (!name || !day || day < 1 || day > 31) {
        alert('Por favor ingrese un nombre válido y un día del mes (1-31)');
        return;
    }

    if (!agendaData.cumpleanos[monthIndex]) {
        agendaData.cumpleanos[monthIndex] = [];
    }

    agendaData.cumpleanos[monthIndex].push({ name, day });
    agendaData.cumpleanos[monthIndex].sort((a, b) => a.day - b.day);

    nameInput.value = '';
    dayInput.value = '';

    renderBirthdays();
    saveData();
}

function renderBirthdays() {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const list = document.getElementById(`birthday-list-${monthIndex}`);
        if (!list) continue;

        list.innerHTML = '';

        if (agendaData.cumpleanos[monthIndex]) {
            agendaData.cumpleanos[monthIndex].forEach((birthday, index) => {
                const item = document.createElement('li');
                item.className = 'birthday-item';
                item.innerHTML = `
                    <span>${birthday.name}</span>
                    <span>Día ${birthday.day}</span>
                    <button onclick="removeBirthday(${monthIndex}, ${index})" class="delete-btn">×</button>
                `;
                list.appendChild(item);
            });
        }
    }
}

function removeBirthday(monthIndex, birthdayIndex) {
    if (agendaData.cumpleanos[monthIndex]) {
        agendaData.cumpleanos[monthIndex].splice(birthdayIndex, 1);
        renderBirthdays();
        saveData();
    }
}

// Events Calendar
function generateEventsCalendar() {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const eventsCalendar = document.querySelector('.events-calendar');
    if (!eventsCalendar) return;

    eventsCalendar.innerHTML = '';

    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'events-month';
        
        monthDiv.innerHTML = `
            <h3>🎉 ${month}</h3>
            <div class="event-form">
                <input type="number" placeholder="Día" min="1" max="31" id="event-day-${index}">
                <textarea placeholder="Descripción del evento" id="event-desc-${index}"></textarea>
                <button onclick="addEvent(${index})">Agregar Evento</button>
            </div>
            <ul class="events-list" id="events-list-${index}"></ul>
        `;
        
        eventsCalendar.appendChild(monthDiv);
    });

    renderEvents();
}

function addEvent(monthIndex) {
    const dayInput = document.getElementById(`event-day-${monthIndex}`);
    const descInput = document.getElementById(`event-desc-${monthIndex}`);
    
    const day = parseInt(dayInput.value);
    const description = descInput.value.trim();
    
    if (!day || !description || day < 1 || day > 31) {
        alert('Por favor complete todos los campos con valores válidos');
        return;
    }

    const date = `2025-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (!agendaData.eventos[monthIndex]) {
        agendaData.eventos[monthIndex] = [];
    }

    agendaData.eventos[monthIndex].push({ date, description, day });
    agendaData.eventos[monthIndex].sort((a, b) => a.day - b.day);

    dayInput.value = '';
    descInput.value = '';

    renderEvents();
    saveData();
}

function renderEvents() {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const list = document.getElementById(`events-list-${monthIndex}`);
        if (!list) continue;

        list.innerHTML = '';

        if (agendaData.eventos[monthIndex]) {
            agendaData.eventos[monthIndex].forEach((event, index) => {
                const item = document.createElement('li');
                item.className = 'event-item';
                item.innerHTML = `
                    <div class="event-date">Día ${event.day}</div>
                    <div class="event-description">${event.description}</div>
                    <button onclick="removeEvent(${monthIndex}, ${index})" class="delete-btn">×</button>
                `;
                list.appendChild(item);
            });
        }
    }
}

function removeEvent(monthIndex, eventIndex) {
    if (agendaData.eventos[monthIndex]) {
        agendaData.eventos[monthIndex].splice(eventIndex, 1);
        renderEvents();
        saveData();
    }
}

// Monthly Pages
function generateMonthlyPages() {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    months.forEach((month, index) => {
        generateMiniCalendar(`mini-${month}`, index);
        generateMonthlyGrid(index + 7, month);
    });
}

function generateMonthlyGrid(pageId, month) {
    const monthlyGrid = document.querySelector(`#page-${pageId} .monthly-grid`);
    if (!monthlyGrid) return;

    monthlyGrid.innerHTML = '';

    // Create 35 cells (5 weeks x 7 days)
    for (let i = 0; i < 35; i++) {
        const cell = document.createElement('div');
        cell.className = 'monthly-cell';
        
        const textarea = document.createElement('textarea');
        textarea.placeholder = `Día ${Math.floor(i/7) + 1}...`;
        textarea.addEventListener('input', function() {
            if (!agendaData.monthly[month]) {
                agendaData.monthly[month] = {};
            }
            agendaData.monthly[month][i] = this.value;
            saveData();
        });
        
        // Load saved data
        if (agendaData.monthly[month] && agendaData.monthly[month][i]) {
            textarea.value = agendaData.monthly[month][i];
        }
        
        cell.appendChild(textarea);
        monthlyGrid.appendChild(cell);
    }
}

// Evaluation functions
function addEvaluation() {
    const fecha = document.getElementById('eval-fecha').value;
    const clase = document.getElementById('eval-clase').value.trim();
    const contenido = document.getElementById('eval-contenido').value.trim();
    const entrega = document.getElementById('eval-entrega').value;

    if (!fecha || !clase || !contenido || !entrega) {
        alert('Por favor complete todos los campos');
        return;
    }

    const evaluation = { fecha, clase, contenido, entrega };
    agendaData.evaluaciones.push(evaluation);
    
    // Sort by date
    agendaData.evaluaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Clear form
    document.getElementById('eval-fecha').value = '';
    document.getElementById('eval-clase').value = '';
    document.getElementById('eval-contenido').value = '';
    document.getElementById('eval-entrega').value = '';

    renderEvaluationList();
    saveData();
}

function renderEvaluationList() {
    const list = document.getElementById('evaluationList');
    if (!list) return;

    list.innerHTML = '';

    agendaData.evaluaciones.forEach((eval, index) => {
        const div = document.createElement('div');
        div.className = 'evaluation-item';
        
        const fechaFormatted = new Date(eval.fecha).toLocaleDateString();
        const entregaFormatted = new Date(eval.entrega).toLocaleDateString();
        
        div.innerHTML = `
            <div><strong>Fecha:</strong><br>${fechaFormatted}</div>
            <div><strong>Clase:</strong><br>${eval.clase}</div>
            <div><strong>Contenido:</strong><br>${eval.contenido}</div>
            <div><strong>Entrega:</strong><br>${entregaFormatted}</div>
            <button class="delete-eval-btn" onclick="removeEvaluation(${index})">×</button>
        `;
        
        list.appendChild(div);
    });
}

function removeEvaluation(index) {
    agendaData.evaluaciones.splice(index, 1);
    renderEvaluationList();
    saveData();
}

// Schedule generation
function generateSchedule() {
    const scheduleContainer = document.querySelector('.schedule-container');
    if (!scheduleContainer) return;

    const defaultHours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', 
                         '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Si no hay horas guardadas, usar las por defecto
    if (!agendaData.horario.hours) {
        agendaData.horario.hours = [...defaultHours];
    }

    let tableHTML = `
        <div style="margin-bottom: 20px;">
            <button class="btn" onclick="addTimeSlot()" style="background: #8B9A8B;">➕ Agregar Horario</button>
        </div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>Hora</th>
                    ${days.map(day => `<th>${day}</th>`).join('')}
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody id="schedule-body">
    `;

    agendaData.horario.hours.forEach((hour, hourIndex) => {
        tableHTML += `<tr>
            <td class="time-slot-editable">
                <input type="time" value="${hour}" onchange="updateHour(${hourIndex}, this.value)" 
                       class="time-input">
            </td>`;
        
        days.forEach(day => {
            const key = `${hour}-${day}`;
            const value = agendaData.horario[key] || '';
            tableHTML += `
                <td>
                    <textarea 
                        onchange="updateSchedule('${key}', this.value)"
                        placeholder="Materia...">${value}</textarea>
                </td>
            `;
        });
        
        tableHTML += `<td><button class="delete-btn" onclick="removeTimeSlot(${hourIndex})">×</button></td></tr>`;
    });

    tableHTML += '</tbody></table>';
    scheduleContainer.innerHTML = tableHTML;
}

function addTimeSlot() {
    const newHour = '19:00';
    agendaData.horario.hours.push(newHour);
    generateSchedule();
    saveData();
}

function removeTimeSlot(hourIndex) {
    const hourToRemove = agendaData.horario.hours[hourIndex];
    
    agendaData.horario.hours.splice(hourIndex, 1);
    
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    days.forEach(day => {
        const key = `${hourToRemove}-${day}`;
        delete agendaData.horario[key];
    });
    
    generateSchedule();
    saveData();
}

function updateHour(hourIndex, newHour) {
    const oldHour = agendaData.horario.hours[hourIndex];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    days.forEach(day => {
        const oldKey = `${oldHour}-${day}`;
        const newKey = `${newHour}-${day}`;
        
        if (agendaData.horario[oldKey]) {
            agendaData.horario[newKey] = agendaData.horario[oldKey];
            delete agendaData.horario[oldKey];
        }
    });
    
    agendaData.horario.hours[hourIndex] = newHour;
    saveData();
}

function updateSchedule(key, value) {
    agendaData.horario[key] = value;
    saveData();
}

// Reading List functions
function addBook() {
    const input = document.getElementById('new-book');
    const book = input.value.trim();
    
    if (!book) {
        alert('Por favor ingrese el título de un libro');
        return;
    }

    agendaData.lectura.push({ title: book, completed: false });
    input.value = '';
    renderReadingList();
    saveData();
}

function renderReadingList() {
    const list = document.getElementById('readingList');
    if (!list) return;

    list.innerHTML = '';

    agendaData.lectura.forEach((book, index) => {
        const item = document.createElement('li');
        item.className = `reading-item ${book.completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <span>${book.title}</span>
            <div class="reading-controls">
                <button class="complete-btn" onclick="toggleBook(${index})">
                    ${book.completed ? '↶ Pendiente' : '✓ Completado'}
                </button>
                <button class="delete-btn" onclick="removeBook(${index})">🗑️</button>
            </div>
        `;
        
        list.appendChild(item);
    });
}

function toggleBook(index) {
    agendaData.lectura[index].completed = !agendaData.lectura[index].completed;
    renderReadingList();
    saveData();
}

function removeBook(index) {
    agendaData.lectura.splice(index, 1);
    renderReadingList();
    saveData();
}

// Goals functions
function addGoal() {
    const input = document.getElementById('new-goal');
    const goal = input.value.trim();
    
    if (!goal) {
        alert('Por favor ingrese un objetivo');
        return;
    }

    agendaData.objetivos.push({ text: goal, completed: false });
    input.value = '';
    renderGoalsList();
    saveData();
}

function renderGoalsList() {
    const list = document.getElementById('goalsList');
    if (!list) return;

    list.innerHTML = '';

    agendaData.objetivos.forEach((goal, index) => {
        const item = document.createElement('li');
        item.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <div class="goal-text">${goal.text}</div>
            <div class="goal-controls">
                <button class="complete-btn" onclick="toggleGoal(${index})">
                    ${goal.completed ? '↶ Pendiente' : '✓ Completado'}
                </button>
                <button class="delete-btn" onclick="removeGoal(${index})">🗑️</button>
            </div>
        `;
        
        list.appendChild(item);
    });
}

function toggleGoal(index) {
    agendaData.objetivos[index].completed = !agendaData.objetivos[index].completed;
    renderGoalsList();
    saveData();
}

function removeGoal(index) {
    agendaData.objetivos.splice(index, 1);
    renderGoalsList();
    saveData();
}

// Weekly Organizer functions - CORRECCIÓN FINAL
function renderWeeklyOrganizer() {
    const weeklyOrganizer = document.querySelector('.weekly-organizer');
    if (!weeklyOrganizer) return;

    // Asegurar que existe la estructura de datos
    if (!agendaData.semanal) {
        agendaData.semanal = {};
    }

    weeklyOrganizer.innerHTML = `
        <div class="weekly-section">
            <h3>📝 Notas</h3>
            <textarea id="weekly-notas" placeholder="Notas importantes de la semana..."></textarea>
        </div>
        
        <div class="weekly-section">
            <h3>⚠️ Importante</h3>
            <textarea id="weekly-importante" placeholder="Recordatorios urgentes..."></textarea>
        </div>
        
        <div class="weekly-section">
            <h3>📋 Tareas</h3>
            <div class="task-form">
                <input type="text" id="new-task" placeholder="Nueva tarea...">
                <button onclick="addTask()">➕</button>
            </div>
            <ul class="task-list" id="taskList"></ul>
        </div>
        
        <div class="weekly-section tasks-section">
            <div class="weekly-days">
                <div class="weekly-day">
                    <h4>Lunes</h4>
                    <textarea id="weekly-lunes" placeholder="Actividades del lunes..."></textarea>
                </div>
                
                <div class="weekly-day">
                    <h4>Martes</h4>
                    <textarea id="weekly-martes" placeholder="Actividades del martes..."></textarea>
                </div>
                
                <div class="weekly-day">
                    <h4>Miércoles</h4>
                    <textarea id="weekly-miercoles" placeholder="Actividades del miércoles..."></textarea>
                </div>
                
                <div class="weekly-day">
                    <h4>Jueves</h4>
                    <textarea id="weekly-jueves" placeholder="Actividades del jueves..."></textarea>
                </div>
                
                <div class="weekly-day">
                    <h4>Viernes</h4>
                    <textarea id="weekly-viernes" placeholder="Actividades del viernes..."></textarea>
                </div>
                
                <div class="weekly-day">
                    <h4>Sábado</h4>
                    <textarea id="weekly-sabado" placeholder="Actividades del sábado..."></textarea>
                </div>
                
                <div class="weekly-day">
                    <h4>Domingo</h4>
                    <textarea id="weekly-domingo" placeholder="Actividades del domingo..."></textarea>
                </div>
            </div>
        </div>
    `;

    // Configurar los event listeners primero
    bindWeeklyEvents();
    renderTasks();
}

// FUNCIÓN CORREGIDA - Esta era la que tenía el problema principal
function bindWeeklyEvents() {
    // CORRECCIÓN: Añadir logs para debug
    console.log('Configurando event listeners para organizador semanal...');
    
    const fields = ['notas', 'importante', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    
    fields.forEach(field => {
        const element = document.getElementById(`weekly-${field}`);
        console.log(`Buscando elemento: weekly-${field}`, element); // Debug log
        
        if (element) {
            // Remover event listeners previos para evitar duplicados
            element.removeEventListener('input', element._weeklyInputHandler);
            
            // Crear y guardar referencia del handler
            element._weeklyInputHandler = function() {
                console.log(`Guardando ${field}: ${this.value}`); // Debug log
                if (!agendaData.semanal) {
                    agendaData.semanal = {};
                }
                agendaData.semanal[field] = this.value;
                saveData();
            };
            
            // Agregar el event listener
            element.addEventListener('input', element._weeklyInputHandler);
            console.log(`Event listener configurado para: ${field}`); // Debug log
        } else {
            console.warn(`Elemento no encontrado: weekly-${field}`); // Debug log
        }
    });
}

function addTask() {
    const input = document.getElementById('new-task');
    const task = input.value.trim();
    
    if (!task) {
        alert('Por favor ingrese una tarea');
        return;
    }

    if (!agendaData.semanal.tareas) {
        agendaData.semanal.tareas = [];
    }

    agendaData.semanal.tareas.push({ text: task, completed: false });
    input.value = '';
    renderTasks();
    saveData();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    if (!list || !agendaData.semanal.tareas) return;

    list.innerHTML = '';

    agendaData.semanal.tareas.forEach((task, index) => {
        const item = document.createElement('li');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${index})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="removeTask(${index})">×</button>
        `;
        
        list.appendChild(item);
    });
}

function toggleTask(index) {
    agendaData.semanal.tareas[index].completed = !agendaData.semanal.tareas[index].completed;
    renderTasks();
    saveData();
}

function removeTask(index) {
    agendaData.semanal.tareas.splice(index, 1);
    renderTasks();
    saveData();
}

// Page management
function changePage() {
    const select = document.getElementById('pageSelect');
    const newPage = parseInt(select.value);
    
    // Hide current page
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    
    // Show new page
    document.getElementById(`page-${newPage}`).classList.add('active');
    
    currentPage = newPage;
    
    // Update delete button state
    updateDeleteButton();
}

function updateDeleteButton() {
    const deleteBtn = document.getElementById('deleteBtn');
    const currentPageData = agendaData.pages.find(p => p.id === currentPage);
    
    if (currentPageData && !currentPageData.canDelete) {
        deleteBtn.disabled = true;
        deleteBtn.style.opacity = '0.5';
        deleteBtn.style.cursor = 'not-allowed';
    } else {
        deleteBtn.disabled = false;
        deleteBtn.style.opacity = '1';
        deleteBtn.style.cursor = 'pointer';
    }
}

function duplicatePage() {
    const currentPageData = agendaData.pages.find(p => p.id === currentPage);
    if (!currentPageData) return;

    const newId = Math.max(...agendaData.pages.map(p => p.id)) + 1;
    
    // Obtener el nombre base sin emojis para contar duplicados
    const titleWithoutEmoji = currentPageData.title.replace(/^\S+\s/, ''); // Remover emoji inicial
    const baseName = titleWithoutEmoji.replace(/\s\d+$/, ''); // Remover números finales si existen
    
    // Contar cuántas páginas del mismo tipo ya existen (incluyendo la original)
    const sameTypePages = agendaData.pages.filter(p => 
        p.title.includes(baseName) && p.id !== currentPage
    );
    
    const nextNumber = sameTypePages.length + 2; // +2 porque la original es 1 y queremos el siguiente
    const emoji = currentPageData.title.match(/^\S+/)[0]; // Obtener el emoji
    const newTitle = `${emoji} ${baseName} ${nextNumber}`;
    
    const newPage = {
        id: newId,
        title: newTitle,
        type: currentPageData.type,
        canDelete: true,
        month: currentPageData.month || null
    };

    agendaData.pages.push(newPage);
    createPageElement(newPage);
    updatePageSelect();
    updateIndice();
    
    // Switch to new page
    document.getElementById('pageSelect').value = newId;
    changePage();
    
    saveData();
}

function deletePage() {
    const currentPageData = agendaData.pages.find(p => p.id === currentPage);
    if (!currentPageData || !currentPageData.canDelete) return;

    if (confirm(`¿Está seguro que desea eliminar "${currentPageData.title}"?`)) {
        // Remove from data
        agendaData.pages = agendaData.pages.filter(p => p.id !== currentPage);
        
        // Remove DOM element
        const pageElement = document.getElementById(`page-${currentPage}`);
        if (pageElement) {
            pageElement.remove();
        }

        // Go to first page
        currentPage = 0;
        document.getElementById('pageSelect').value = 0;
        changePage();
        
        updatePageSelect();
        updateIndice();
        saveData();
    }
}

function createPageElement(pageData) {
    const pageContent = document.querySelector('.page-content');
    const newPageDiv = document.createElement('div');
    newPageDiv.className = 'page';
    newPageDiv.id = `page-${pageData.id}`;
    
    // Create content based on type with full templates
    switch(pageData.type) {
        case 'semanal':
            newPageDiv.innerHTML = `
                <h2 style="color: #8B9A8B; text-align: center; margin-bottom: 30px; font-size: 2.5em;">${pageData.title}</h2>
                <div class="weekly-organizer-new">
                    <!-- Content generated by renderWeeklyOrganizerForPage -->
                </div>
            `;
            pageContent.appendChild(newPageDiv);
            
            const semanalKey = `semanal_page${pageData.id}`;
            if (!agendaData[semanalKey]) {
                agendaData[semanalKey] = {};
            }
            
            setTimeout(() => {
                renderWeeklyOrganizerForPage(pageData.id);
            }, 100);
            break;
            
        case 'horario':
            newPageDiv.innerHTML = `
                <h2 style="color: #8B9A8B; text-align: center; margin-bottom: 30px; font-size: 2.5em;">${pageData.title}</h2>
                <div class="schedule-container-new">
                    <!-- Generated by JavaScript -->
                </div>
            `;
            pageContent.appendChild(newPageDiv);
            
            const horarioKey = `horario_${pageData.id}`;
            if (!agendaData[horarioKey]) {
                const defaultHours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', 
                                     '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
                agendaData[horarioKey] = { hours: [...defaultHours] };
            }
            
            setTimeout(() => {
                generateScheduleForPage(pageData.id);
            }, 100);
            break;
            
        case 'lectura':
            newPageDiv.innerHTML = `
                <h2 style="color: #8B9A8B; text-align: center; margin-bottom: 30px; font-size: 2.5em;">${pageData.title}</h2>
                <div style="max-width: 600px; margin: 0 auto;">
                    <div class="reading-form" style="margin-bottom: 30px;">
                        <div class="form-group">
                            <input type="text" id="new-book-${pageData.id}" placeholder="Agregar libro a la lista..." style="margin-bottom: 10px;">
                            <button class="btn" onclick="addBookForPage(${pageData.id})" style="background: #8B9A8B;">📚 Agregar Libro</button>
                        </div>
                    </div>
                    <div class="reading-list" id="readingList-${pageData.id}">
                        <!-- Generated by JavaScript -->
                    </div>
                </div>
            `;
            pageContent.appendChild(newPageDiv);
            
            const lecturaKey = `lectura_${pageData.id}`;
            if (!agendaData[lecturaKey]) {
                agendaData[lecturaKey] = [];
            }
            break;
            
        case 'objetivos':
            newPageDiv.innerHTML = `
                <h2 style="color: #8B9A8B; text-align: center; margin-bottom: 30px; font-size: 2.5em;">${pageData.title}</h2>
                <div style="max-width: 600px; margin: 0 auto;">
                    <div class="goals-form" style="margin-bottom: 30px;">
                        <div class="form-group">
                            <textarea id="new-goal-${pageData.id}" placeholder="Escriba su nuevo objetivo..." style="margin-bottom: 10px; min-height: 80px;"></textarea>
                            <button class="btn" onclick="addGoalForPage(${pageData.id})" style="background: #8B9A8B;">🎯 Agregar Objetivo</button>
                        </div>
                    </div>
                    <div class="goals-list" id="goalsList-${pageData.id}">
                        <!-- Generated by JavaScript -->
                    </div>
                </div>
            `;
            pageContent.appendChild(newPageDiv);
            
            const objetivosKey = `objetivos_${pageData.id}`;
            if (!agendaData[objetivosKey]) {
                agendaData[objetivosKey] = [];
            }
            break;
            
        case 'monthly':
            const monthName = pageData.month || 'Mes';
            const monthLower = monthName.toLowerCase();
            const emoji = pageData.title.match(/^\S+/)[0];
            
            newPageDiv.innerHTML = `
                <div class="monthly-page" data-month="${monthName}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <h2 style="color: #8B9A8B; font-size: 3em; margin: 0;">${emoji} ${monthName}</h2>
                        <div class="mini-calendar" id="mini-${monthLower}-${pageData.id}"></div>
                    </div>
                    <div class="monthly-grid" id="monthly-grid-${pageData.id}"></div>
                </div>
            `;
            pageContent.appendChild(newPageDiv);
            
            const monthlyKey = `monthly_${pageData.id}`;
            if (!agendaData[monthlyKey]) {
                agendaData[monthlyKey] = {};
            }
            
            setTimeout(() => {
                const monthIndex = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
                                  .indexOf(monthLower);
                if (monthIndex !== -1) {
                    generateMiniCalendar(`mini-${monthLower}-${pageData.id}`, monthIndex);
                    generateMonthlyGridForPage(pageData.id, monthLower);
                }
            }, 100);
            break;
            
        default:
            newPageDiv.innerHTML = `<h2>Página: ${pageData.title}</h2><p>Plantilla en desarrollo para tipo: ${pageData.type}</p>`;
            pageContent.appendChild(newPageDiv);
    }
    
    saveData();
}

// Funciones auxiliares para páginas duplicadas
function generateScheduleForPage(pageId) {
    const container = document.querySelector(`#page-${pageId} .schedule-container-new`);
    if (!container) return;
    
    const defaultHours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', 
                         '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const storageKey = `horario_${pageId}`;
    if (!agendaData[storageKey]) {
        agendaData[storageKey] = { hours: [...defaultHours] };
    }

    let tableHTML = `
        <div style="margin-bottom: 20px;">
            <button class="btn" onclick="addTimeSlotForPage(${pageId})" style="background: #8B9A8B;">➕ Agregar Horario</button>
        </div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>Hora</th>
                    ${days.map(day => `<th>${day}</th>`).join('')}
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    agendaData[storageKey].hours.forEach((hour, hourIndex) => {
        tableHTML += `<tr>
            <td class="time-slot-editable">
                <input type="time" value="${hour}" onchange="updateHourForPage(${pageId}, ${hourIndex}, this.value)" 
                       class="time-input">
            </td>`;
        
        days.forEach(day => {
            const key = `${hour}-${day}`;
            const value = agendaData[storageKey][key] || '';
            tableHTML += `
                <td>
                    <textarea 
                        onchange="updateScheduleForPage(${pageId}, '${key}', this.value)"
                        placeholder="Materia...">${value}</textarea>
                </td>
            `;
        });
        
        tableHTML += `<td><button class="delete-btn" onclick="removeTimeSlotForPage(${pageId}, ${hourIndex})">×</button></td></tr>`;
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

function generateMonthlyGridForPage(pageId, month) {
    const monthlyGrid = document.querySelector(`#monthly-grid-${pageId}`);
    if (!monthlyGrid) return;

    monthlyGrid.innerHTML = '';
    const storageKey = `monthly_${pageId}`;

    // Create 35 cells (5 weeks x 7 days)
    for (let i = 0; i < 35; i++) {
        const cell = document.createElement('div');
        cell.className = 'monthly-cell';
        
        const textarea = document.createElement('textarea');
        textarea.placeholder = `Día ${Math.floor(i/7) + 1}...`;
        textarea.addEventListener('input', function() {
            if (!agendaData[storageKey]) {
                agendaData[storageKey] = {};
            }
            agendaData[storageKey][i] = this.value;
            saveData();
        });
        
        cell.appendChild(textarea);
        monthlyGrid.appendChild(cell);
    }
}

// Funciones para horarios de páginas duplicadas
function addTimeSlotForPage(pageId) {
    const storageKey = `horario_${pageId}`;
    const newHour = '19:00';
    agendaData[storageKey].hours.push(newHour);
    generateScheduleForPage(pageId);
    saveData();
}

function removeTimeSlotForPage(pageId, hourIndex) {
    const storageKey = `horario_${pageId}`;
    const hourToRemove = agendaData[storageKey].hours[hourIndex];
    
    agendaData[storageKey].hours.splice(hourIndex, 1);
    
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    days.forEach(day => {
        const key = `${hourToRemove}-${day}`;
        delete agendaData[storageKey][key];
    });
    
    generateScheduleForPage(pageId);
    saveData();
}

function updateHourForPage(pageId, hourIndex, newHour) {
    const storageKey = `horario_${pageId}`;
    const oldHour = agendaData[storageKey].hours[hourIndex];
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    days.forEach(day => {
        const oldKey = `${oldHour}-${day}`;
        const newKey = `${newHour}-${day}`;
        
        if (agendaData[storageKey][oldKey]) {
            agendaData[storageKey][newKey] = agendaData[storageKey][oldKey];
            delete agendaData[storageKey][oldKey];
        }
    });
    
    agendaData[storageKey].hours[hourIndex] = newHour;
    saveData();
}

function updateScheduleForPage(pageId, key, value) {
    const storageKey = `horario_${pageId}`;
    agendaData[storageKey][key] = value;
    saveData();
}

// Funciones para listas de lectura duplicadas
function addBookForPage(pageId) {
    const input = document.getElementById(`new-book-${pageId}`);
    const book = input.value.trim();
    
    if (!book) {
        alert('Por favor ingrese el título de un libro');
        return;
    }

    const storageKey = `lectura_${pageId}`;
    if (!agendaData[storageKey]) {
        agendaData[storageKey] = [];
    }

    agendaData[storageKey].push({ title: book, completed: false });
    input.value = '';
    renderReadingListForPage(pageId);
    saveData();
}

function renderReadingListForPage(pageId) {
    const list = document.getElementById(`readingList-${pageId}`);
    const storageKey = `lectura_${pageId}`;
    
    if (!list || !agendaData[storageKey]) return;

    list.innerHTML = '';

    agendaData[storageKey].forEach((book, index) => {
        const item = document.createElement('li');
        item.className = `reading-item ${book.completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <span>${book.title}</span>
            <div class="reading-controls">
                <button class="complete-btn" onclick="toggleBookForPage(${pageId}, ${index})">
                    ${book.completed ? '↶ Pendiente' : '✓ Completado'}
                </button>
                <button class="delete-btn" onclick="removeBookForPage(${pageId}, ${index})">🗑️</button>
            </div>
        `;
        
        list.appendChild(item);
    });
}

function toggleBookForPage(pageId, index) {
    const storageKey = `lectura_${pageId}`;
    agendaData[storageKey][index].completed = !agendaData[storageKey][index].completed;
    renderReadingListForPage(pageId);
    saveData();
}

function removeBookForPage(pageId, index) {
    const storageKey = `lectura_${pageId}`;
    agendaData[storageKey].splice(index, 1);
    renderReadingListForPage(pageId);
    saveData();
}

// Funciones para objetivos duplicados
function addGoalForPage(pageId) {
    const input = document.getElementById(`new-goal-${pageId}`);
    const goal = input.value.trim();
    
    if (!goal) {
        alert('Por favor ingrese un objetivo');
        return;
    }

    const storageKey = `objetivos_${pageId}`;
    if (!agendaData[storageKey]) {
        agendaData[storageKey] = [];
    }

    agendaData[storageKey].push({ text: goal, completed: false });
    input.value = '';
    renderGoalsListForPage(pageId);
    saveData();
}

function renderGoalsListForPage(pageId) {
    const list = document.getElementById(`goalsList-${pageId}`);
    const storageKey = `objetivos_${pageId}`;
    
    if (!list || !agendaData[storageKey]) return;

    list.innerHTML = '';

    agendaData[storageKey].forEach((goal, index) => {
        const item = document.createElement('li');
        item.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <div class="goal-text">${goal.text}</div>
            <div class="goal-controls">
                <button class="complete-btn" onclick="toggleGoalForPage(${pageId}, ${index})">
                    ${goal.completed ? '↶ Pendiente' : '✓ Completado'}
                </button>
                <button class="delete-btn" onclick="removeGoalForPage(${pageId}, ${index})">🗑️</button>
            </div>
        `;
        
        list.appendChild(item);
    });
}

function toggleGoalForPage(pageId, index) {
    const storageKey = `objetivos_${pageId}`;
    agendaData[storageKey][index].completed = !agendaData[storageKey][index].completed;
    renderGoalsListForPage(pageId);
    saveData();
}

function removeGoalForPage(pageId, index) {
    const storageKey = `objetivos_${pageId}`;
    agendaData[storageKey].splice(index, 1);
    renderGoalsListForPage(pageId);
    saveData();
}

// FUNCIÓN PRINCIPAL CORREGIDA para renderizar organizador semanal en páginas duplicadas
function renderWeeklyOrganizerForPage(pageId) {
    const container = document.querySelector(`#page-${pageId} .weekly-organizer-new`);
    if (!container) return;

    const uniqueId = `page${pageId}`;
    const storageKey = `semanal_${uniqueId}`;
    
    if (!agendaData[storageKey]) {
        agendaData[storageKey] = {};
    }
    
    container.innerHTML = `
        <div class="weekly-organizer">
            <div class="weekly-section">
                <h3>📝 Notas</h3>
                <textarea id="weekly-notes-${uniqueId}" placeholder="Notas importantes de la semana...">${agendaData[storageKey].notas || ''}</textarea>
            </div>
            
            <div class="weekly-section">
                <h3>⚠️ Importante</h3>
                <textarea id="weekly-important-${uniqueId}" placeholder="Recordatorios urgentes...">${agendaData[storageKey].importante || ''}</textarea>
            </div>
            
            <div class="weekly-section">
                <h3>📋 Tareas</h3>
                <div class="task-form">
                    <input type="text" id="new-task-${uniqueId}" placeholder="Nueva tarea...">
                    <button onclick="addTaskForPage('${uniqueId}')">➕</button>
                </div>
                <ul class="task-list" id="taskList-${uniqueId}"></ul>
            </div>
            
            <div class="weekly-section tasks-section">
                <div class="weekly-days">
                    <div class="weekly-day">
                        <h4>Lunes</h4>
                        <textarea id="weekly-lunes-${uniqueId}" placeholder="Actividades del lunes...">${agendaData[storageKey].lunes || ''}</textarea>
                    </div>
                    
                    <div class="weekly-day">
                        <h4>Martes</h4>
                        <textarea id="weekly-martes-${uniqueId}" placeholder="Actividades del martes...">${agendaData[storageKey].martes || ''}</textarea>
                    </div>
                    
                    <div class="weekly-day">
                        <h4>Miércoles</h4>
                        <textarea id="weekly-miercoles-${uniqueId}" placeholder="Actividades del miércoles...">${agendaData[storageKey].miercoles || ''}</textarea>
                    </div>
                    
                    <div class="weekly-day">
                        <h4>Jueves</h4>
                        <textarea id="weekly-jueves-${uniqueId}" placeholder="Actividades del jueves...">${agendaData[storageKey].jueves || ''}</textarea>
                    </div>
                    
                    <div class="weekly-day">
                        <h4>Viernes</h4>
                        <textarea id="weekly-viernes-${uniqueId}" placeholder="Actividades del viernes...">${agendaData[storageKey].viernes || ''}</textarea>
                    </div>
                    
                    <div class="weekly-day">
                        <h4>Sábado</h4>
                        <textarea id="weekly-sabado-${uniqueId}" placeholder="Actividades del sábado...">${agendaData[storageKey].sabado || ''}</textarea>
                    </div>
                    
                    <div class="weekly-day">
                        <h4>Domingo</h4>
                        <textarea id="weekly-domingo-${uniqueId}" placeholder="Actividades del domingo...">${agendaData[storageKey].domingo || ''}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // CORRECCIÓN CLAVE: Bind events correctamente para cada página específica
    const fields = ['notas', 'importante', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    fields.forEach(field => {
        const element = document.getElementById(`weekly-${field}-${uniqueId}`);
        if (element) {
            element.addEventListener('input', function() {
                if (!agendaData[storageKey]) {
                    agendaData[storageKey] = {};
                }
                agendaData[storageKey][field] = this.value;
                saveData();
            });
        }
    });
    
    // Render existing tasks
    renderTasksForPage(uniqueId);
}

function addTaskForPage(uniqueId) {
    const input = document.getElementById(`new-task-${uniqueId}`);
    const task = input.value.trim();
    
    if (!task) {
        alert('Por favor ingrese una tarea');
        return;
    }

    const storageKey = `tasks_${uniqueId}`;
    if (!agendaData[storageKey]) {
        agendaData[storageKey] = [];
    }

    agendaData[storageKey].push({ text: task, completed: false });
    input.value = '';
    renderTasksForPage(uniqueId);
    saveData();
}

function renderTasksForPage(uniqueId) {
    const list = document.getElementById(`taskList-${uniqueId}`);
    const storageKey = `tasks_${uniqueId}`;
    
    if (!list || !agendaData[storageKey]) return;

    list.innerHTML = '';

    agendaData[storageKey].forEach((task, index) => {
        const item = document.createElement('li');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTaskForPage('${uniqueId}', ${index})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="removeTaskForPage('${uniqueId}', ${index})">×</button>
        `;
        
        list.appendChild(item);
    });
}

function toggleTaskForPage(uniqueId, index) {
    const storageKey = `tasks_${uniqueId}`;
    agendaData[storageKey][index].completed = !agendaData[storageKey][index].completed;
    renderTasksForPage(uniqueId);
    saveData();
}

function removeTaskForPage(uniqueId, index) {
    const storageKey = `tasks_${uniqueId}`;
    agendaData[storageKey].splice(index, 1);
    renderTasksForPage(uniqueId);
    saveData();
}

function updatePageSelect() {
    const select = document.getElementById('pageSelect');
    select.innerHTML = '';
    
    agendaData.pages.forEach(page => {
        const option = document.createElement('option');
        option.value = page.id;
        option.textContent = page.title;
        select.appendChild(option);
    });
}

function updateIndice() {
    const indiceList = document.getElementById('indiceList');
    if (!indiceList) return;
    
    indiceList.innerHTML = '';
    
    agendaData.pages.forEach((page, index) => {
        if (page.id === 1) return; // Skip index page itself
        
        const li = document.createElement('li');
        li.className = 'indice-item';
        li.onclick = () => {
            document.getElementById('pageSelect').value = page.id;
            changePage();
        };
        
        li.innerHTML = `
            <span>${page.title}</span>
            <span>Página ${index + 1}</span>
        `;
        
        indiceList.appendChild(li);
    });
}

// Form binding
function bindFormEvents() {
    const fields = ['nombre', 'direccion', 'telefono', 'email', 'otros'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', function() {
                agendaData.datos[field] = this.value;
                saveData();
            });
        }
    });
}

// Data management
function loadData() {
    try {
        const saved = localStorage.getItem('agendaData');
        if (saved) {
            const loadedData = JSON.parse(saved);
            agendaData = { ...agendaData, ...loadedData };
            
            if (!agendaData.pageCounters) {
                agendaData.pageCounters = {};
            }
            
            // Update form data
            Object.keys(agendaData.datos).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = agendaData.datos[key] || '';
                }
            });
            
            // Recrear páginas duplicadas que no existen en el DOM
            agendaData.pages.forEach(pageData => {
                if (pageData.canDelete && !document.getElementById(`page-${pageData.id}`)) {
                    createPageElement(pageData);
                }
            });
            
            updatePageSelect();
            updateIndice();
        }
    } catch (e) {
        console.error('Error loading data:', e);
    }
}

function saveData() {
    try {
        localStorage.setItem('agendaData', JSON.stringify(agendaData));
    } catch (e) {
        console.error('Error saving data:', e);
        alert('⚠️ Error al guardar los datos');
    }
}

function clearAllData() {
    if (confirm('⚠️ ¿Está seguro que desea borrar todos los datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('agendaData');
        location.reload();
    }
}

// Print functionality
function printPage() {
    window.print();
}

function exportPDF() {
    alert('🔧 Funcionalidad de PDF en desarrollo. Por ahora use "Imprimir" y seleccione "Guardar como PDF".');
}