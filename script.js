const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  const isLightTheme = theme === 'light';
  document.body.classList.toggle('light-theme', isLightTheme);

  if (themeToggle) {
    const nextThemeLabel = isLightTheme ? 'Switch to dark mode' : 'Switch to light mode';
    themeToggle.textContent = isLightTheme ? '☾' : '☀';
    themeToggle.setAttribute('aria-label', nextThemeLabel);
    themeToggle.title = nextThemeLabel;
    themeToggle.setAttribute('aria-pressed', String(isLightTheme));
  }
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme-preference');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('theme-preference', nextTheme);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));

const registrationForm = document.getElementById('registrationForm');
const registrationMessage = document.getElementById('regMessage');

if (registrationForm && registrationMessage) {
  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const selectedPlan = formData.get('plan');

    registrationMessage.textContent = `Thanks for registering. Your ${selectedPlan} plan request has been received.`;
    registrationMessage.style.color = 'var(--success)';
    registrationForm.reset();
  });
}

const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactMessageStatus');

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactStatus.textContent = 'Thank you. We will contact you shortly.';
    contactStatus.style.color = 'var(--success)';
    contactForm.reset();
  });
}

const calculatorForm = document.getElementById('fitnessCalculatorForm');
const calculatorMessage = document.getElementById('calculatorMessage');
const calculatorResults = document.getElementById('calculatorResults');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const calorieValue = document.getElementById('calorieValue');

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal weight';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  return 'Obese';
}

if (calculatorForm && calculatorMessage && calculatorResults && bmiValue && bmiCategory && calorieValue) {
  calculatorForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(calculatorForm);
    const gender = String(formData.get('gender') || '');
    const age = Number(formData.get('age'));
    const heightCm = Number(formData.get('height'));
    const weightKg = Number(formData.get('weight'));
    const activity = Number(formData.get('activity'));

    if (!gender || !age || !heightCm || !weightKg || !activity) {
      calculatorMessage.textContent = 'Please complete all fields to calculate your results.';
      calculatorMessage.style.color = '#ff9f9b';
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    const bmr =
      gender === 'male'
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    const maintenanceCalories = bmr * activity;

    bmiValue.textContent = bmi.toFixed(1);
    bmiCategory.textContent = getBmiCategory(bmi);
    calorieValue.textContent = `${Math.round(maintenanceCalories)} kcal/day`;

    calculatorMessage.textContent = 'Calculated successfully. Use these values as guidance, not a medical diagnosis.';
    calculatorMessage.style.color = 'var(--success)';
    calculatorResults.hidden = false;
  });
}

const workoutPlanForm = document.getElementById('workoutPlanForm');
const workoutMessage = document.getElementById('workoutMessage');
const workoutResult = document.getElementById('workoutResult');
const workoutResultTitle = document.getElementById('workoutResultTitle');
const workoutList = document.getElementById('workoutList');

const workoutPlans = {
  'weight-loss': {
    title: 'Weight Loss Routine (Weekly)',
    items: [
      'Monday: 30 min brisk treadmill + full-body circuit (3 rounds)',
      'Tuesday: HIIT cardio 20 min + core training 15 min',
      'Wednesday: Lower body strength + 15 min incline walk',
      'Thursday: Active recovery (yoga or mobility 30 min)',
      'Friday: Upper body strength + rowing machine 20 min',
      'Saturday: Zumba/cardio class 45 min + stretching',
      'Sunday: Light walk and recovery'
    ]
  },
  'muscle-gain': {
    title: 'Muscle Gain Routine (Weekly)',
    items: [
      'Monday: Chest + triceps (compound focus)',
      'Tuesday: Back + biceps + core',
      'Wednesday: Legs (squats, lunges, deadlift variations)',
      'Thursday: Rest or mobility session',
      'Friday: Shoulders + arms hypertrophy',
      'Saturday: Full-body progressive overload session',
      'Sunday: Rest and recovery'
    ]
  },
  'general-fitness': {
    title: 'General Fitness Routine (Weekly)',
    items: [
      'Monday: Full-body strength + mobility',
      'Tuesday: Cardio intervals 25 min + core',
      'Wednesday: Yoga or flexibility work 35 min',
      'Thursday: Upper body + light conditioning',
      'Friday: Lower body + stability drills',
      'Saturday: Group class (Zumba/cardio mix)',
      'Sunday: Walk, stretch, and recovery'
    ]
  }
};

if (workoutPlanForm && workoutMessage && workoutResult && workoutResultTitle && workoutList) {
  workoutPlanForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const goal = new FormData(workoutPlanForm).get('goal');
    const selectedPlan = workoutPlans[String(goal)];

    if (!selectedPlan) {
      workoutMessage.textContent = 'Please select a goal to generate a workout plan.';
      workoutMessage.style.color = '#ff9f9b';
      workoutResult.hidden = true;
      return;
    }

    workoutResultTitle.textContent = selectedPlan.title;
    workoutList.innerHTML = selectedPlan.items.map((item) => `<li>${item}</li>`).join('');
    workoutMessage.textContent = 'Your recommended weekly routine is ready.';
    workoutMessage.style.color = 'var(--success)';
    workoutResult.hidden = false;
  });
}
