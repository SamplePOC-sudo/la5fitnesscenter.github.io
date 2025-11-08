/* ============================================================================
   LA5FITNESS CENTER - SCRIPT.JS
   Revolutionary Premium Gym Website - JavaScript Functionality
   ============================================================================ */

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      hamburger.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.style.display = 'none';
      if (hamburger) hamburger.classList.remove('active');
    });
  });
});

// ============================================================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================================================
// BMI CALCULATOR FUNCTIONALITY
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const unitSelect = document.getElementById('unit');
  const calculateBtn = document.getElementById('calculateBMI');
  const resetBtn = document.getElementById('resetBMI');
  const resultsDiv = document.getElementById('bmiResults');
  const bmiNumberDiv = document.getElementById('bmiNumber');
  const bmiCategoryDiv = document.getElementById('bmiCategory');
  const bmiIndicator = document.getElementById('bmiIndicator');
  const bmiTip = document.getElementById('bmiTip');

  const bmiCategories = {
    underweight: {
      min: 0,
      max: 18.4,
      label: 'Underweight',
      color: '#3498db',
      tip: 'You may need to gain weight. Consult with a healthcare professional for a personalized plan.'
    },
    normal: {
      min: 18.5,
      max: 24.9,
      label: 'Normal Weight',
      color: '#2ecc71',
      tip: 'Great! You have a healthy weight. Continue maintaining your fitness routine!'
    },
    overweight: {
      min: 25,
      max: 29.9,
      label: 'Overweight',
      color: '#f39c12',
      tip: 'Consider increasing physical activity and maintaining a balanced diet.'
    },
    obese1: {
      min: 30,
      max: 34.9,
      label: 'Obese Class I',
      color: '#e74c3c',
      tip: 'Join our premium fitness programs to start your transformation journey!'
    },
    obese2: {
      min: 35,
      max: 39.9,
      label: 'Obese Class II',
      color: '#c0392b',
      tip: 'Our expert trainers can help you achieve your fitness goals safely.'
    },
    obese3: {
      min: 40,
      max: Infinity,
      label: 'Obese Class III',
      color: '#8b0000',
      tip: 'Contact our team for personalized fitness and nutrition guidance.'
    }
  };

  function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const unit = unitSelect.value;

    // Validation
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert('Please enter valid weight and height values.');
      return;
    }

    let bmi;

    if (unit === 'kg-cm') {
      // Convert cm to meters and calculate BMI
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // Pounds and inches
      bmi = (weight / (height * height)) * 703;
    }

    // Round to 1 decimal place
    bmi = Math.round(bmi * 10) / 10;

    // Determine category
    let category;
    for (let key in bmiCategories) {
      const cat = bmiCategories[key];
      if (bmi >= cat.min && bmi <= cat.max) {
        category = cat;
        break;
      }
    }

    // Display results
    displayBMIResults(bmi, category, weight, height, unit);
  }

  function displayBMIResults(bmi, category, weight, height, unit) {
    bmiNumberDiv.textContent = bmi;
    bmiCategoryDiv.textContent = category.label;
    bmiCategoryDiv.style.color = category.color;
    bmiIndicator.style.background = category.color;
    bmiIndicator.style.boxShadow = `0 0 20px ${category.color}40`;
    bmiTip.textContent = category.tip;

    // Calculate and display ideal weight range
    const unit_text = unit === 'kg-cm' ? 'kg' : 'lbs';
    const heightForCalculation = unit === 'kg-cm' ? height / 100 : height;
    
    const minWeightBMI = 18.5;
    const maxWeightBMI = 24.9;
    
    let minIdealWeight, maxIdealWeight;
    
    if (unit === 'kg-cm') {
      minIdealWeight = Math.round(minWeightBMI * heightForCalculation * heightForCalculation);
      maxIdealWeight = Math.round(maxWeightBMI * heightForCalculation * heightForCalculation);
    } else {
      minIdealWeight = Math.round((minWeightBMI * heightForCalculation * heightForCalculation) / 703);
      maxIdealWeight = Math.round((maxWeightBMI * heightForCalculation * heightForCalculation) / 703);
    }

    const idealWeightText = `Ideal weight range: ${minIdealWeight} - ${maxIdealWeight} ${unit_text}`;
    
    // Create or update the ideal weight display
    let idealWeightDiv = document.getElementById('idealWeight');
    if (!idealWeightDiv) {
      idealWeightDiv = document.createElement('div');
      idealWeightDiv.id = 'idealWeight';
      idealWeightDiv.style.marginTop = '1rem';
      idealWeightDiv.style.fontSize = '0.95rem';
      idealWeightDiv.style.color = '#c9a961';
      bmiTip.parentElement.insertBefore(idealWeightDiv, bmiTip);
    }
    idealWeightDiv.textContent = idealWeightText;

    // Show results with animation
    resultsDiv.classList.add('active');
    resultsDiv.style.animation = 'slideIn 0.5s ease-out';
  }

  // Event listeners
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateBMI);
  }

  // Allow Enter key to calculate
  if (weightInput && heightInput) {
    [weightInput, heightInput].forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          calculateBMI();
        }
      });
    });
  }

  // Reset function
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (weightInput) weightInput.value = '';
      if (heightInput) heightInput.value = '';
      resultsDiv.classList.remove('active');
      resultsDiv.style.display = 'none';
    });
  }
});

// ============================================================================
// SMOOTH SCROLL ANIMATION ON PAGE LOAD
// ============================================================================

window.addEventListener('scroll', function() {
  const scrollElements = document.querySelectorAll('.section-header, .offer-card, .package-card');
  
  scrollElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
  });
});

// ============================================================================
// CONTACT FORM SUBMISSION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value;
      const email = document.getElementById('contactEmail')?.value;
      const phone = document.getElementById('contactPhone')?.value;
      const message = document.getElementById('contactMessage')?.value;

      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Show success message
      alert(`Thank you for your message, ${name}! We will get back to you soon.`);

      // Reset form
      contactForm.reset();

      // Log submission (for demonstration)
      console.log({
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      });
    });
  }
});

// ============================================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================================================

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ============================================================================
// PACKAGE CARD SELECTION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  const packageButtons = document.querySelectorAll('.package-button');

  packageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const packageName = this.closest('.package-card').querySelector('.package-name').textContent;
      const packageDuration = this.closest('.package-card').querySelector('.package-duration').textContent;

      alert(`You selected: ${packageName} - ${packageDuration}\n\nPlease contact us at 7989764894 to complete your membership!`);
    });
  });
});

// ============================================================================
// RANGE SLIDER DISPLAY VALUE
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');

  if (weightInput) {
    weightInput.addEventListener('input', function() {
      // You can add custom logic here to update displayed value
      console.log('Weight: ' + this.value);
    });
  }

  if (heightInput) {
    heightInput.addEventListener('input', function() {
      // You can add custom logic here to update displayed value
      console.log('Height: ' + this.value);
    });
  }
});

// ============================================================================
// PAGE LOAD ANIMATIONS
// ============================================================================

window.addEventListener('load', function() {
  // Add fade-in animation to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.animation = 'fadeInDown 0.8s ease-out';
  }

  // Stagger animations for offer cards
  const offerCards = document.querySelectorAll('.offer-card');
  offerCards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s both`;
  });

  // Stagger animations for package cards
  const packageCards = document.querySelectorAll('.package-card');
  packageCards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s both`;
  });
});

// ============================================================================
// SCROLL TO TOP BUTTON (Optional Feature)
// ============================================================================

function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.id = 'scrollToTopBtn';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #ffd700 0%, #f5d547 100%);
    color: #000;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
    transition: all 0.3s ease;
  `;

  document.body.appendChild(button);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });

  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.6)';
  });

  button.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.4)';
  });
}

// Initialize scroll to top button when page loads
window.addEventListener('load', createScrollToTopButton);

// ============================================================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING
// ============================================================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ============================================================================
// PREVENT RIGHT-CLICK CONTEXT MENU (Optional Security Feature)
// ============================================================================

// Uncomment if you want to disable right-click
/*
document.addEventListener('contextmenu', function(e) {
  // Allow right-click on inputs for copy/paste
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    return false;
  }
});
*/

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================

console.log('%cLA5FITNESS CENTER', 'font-size: 24px; font-weight: bold; color: #ffd700;');
console.log('%cRevolutionary Premium Gym Website', 'font-size: 14px; color: #f5d547;');
console.log('%cOwner: Sai Kiran | Contact: 7989764894', 'font-size: 12px; color: #c9a961;');