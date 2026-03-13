# Iron Pulse Fitness Center Website

A modern, responsive single-page website for a local gym/fitness business.

## Overview
This project is designed as a complete local fitness business website with an energetic and professional UI using a black/red/white theme. It includes interactive tools, membership details, class schedule, trainer information, registration/contact forms, and blog content.

## Features

- **Responsive design** (mobile, tablet, desktop)
- **Hero section** with motivational branding and call-to-action buttons
- **Membership Plans**: Basic, Standard, Premium
- **Trainer profiles** with specialization and experience
- **Weekly class schedule** (Yoga, Cardio, Strength, Zumba)
- **Online registration form** (name, email, phone, plan)
- **BMI & Daily Calorie Calculator**
- **Workout Plan Generator** (Weight Loss, Muscle Gain, General Fitness)
- **Diet Plan Section**:
  - Weekly diet plan
  - Protein-rich foods
  - Nutrition tips
- **Fitness blog** cards
- **Contact section** with:
  - Contact details
  - Inquiry form
  - Embedded map
- **Dark/Light mode toggle** using moon/sun symbols (☾ / ☀)
- **Enhanced button and navigation hover effects**

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6)**
- **Google Fonts** (Barlow, Teko)

## Project Structure

```text
project3/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## How to Run

1. Open the project folder in VS Code.
2. Open `index.html` in your browser.

### Recommended (for best development experience)
Use the **Live Server** extension in VS Code:

1. Install `Live Server`.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

## Interactive Logic Included

- Theme preference is saved in `localStorage`.
- BMI and calorie calculations are handled client-side.
- Workout routines are generated client-side based on selected goal.
- Registration and contact forms show user feedback messages.

## Notes

- This is a frontend-only project.
- Forms are currently demo forms (no backend/database integration).
- You can connect the forms to Firebase, Google Sheets, or a custom backend later.

## Future Enhancements

- Backend form submission (Node.js / Firebase)
- Payment integration for memberships
- Member login dashboard
- Blog detail pages and CMS support
- Class booking with seat availability

## Author

Created as part of a local business website and live pitch project.