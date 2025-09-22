// Application data
const appData = {
  "services": [
    {
      "name": "Bookkeeping & Accounting",
      "description": "Complete bookkeeping services with UK GAAP compliance",
      "price": "£10-16/hour"
    },
    {
      "name": "VAT Return Services", 
      "description": "Expert VAT compliance and return preparation",
      "price": "£12-18/hour"
    },
    {
      "name": "Payroll Administration",
      "description": "Full payroll processing with HMRC compliance", 
      "price": "£10-15/hour"
    },
    {
      "name": "MTD Compliance",
      "description": "Making Tax Digital implementation and ongoing support",
      "price": "£12-20/hour"
    },
    {
      "name": "Financial Reporting",
      "description": "Management accounts and statutory reporting",
      "price": "£14-20/hour"
    },
    {
      "name": "Reconciliation Services",
      "description": "Bank, supplier, and customer reconciliations",
      "price": "£10-14/hour"
    }
  ],
  "pricing_models": [
    {
      "type": "Hourly Model",
      "description": "Flexible hourly rates based on service complexity",
      "benefits": ["Pay only for work done", "Flexible scaling", "No long-term commitment"],
      "rates": "£10-18/hour"
    },
    {
      "type": "Dedicated Resource Model", 
      "description": "Full-time dedicated accountant for your practice",
      "benefits": ["Consistent team member", "Better rates", "Long-term partnership"],
      "rates": "£1,000-1,800/month"
    }
  ]
};

// Utility Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatPercentage(percentage) {
  return percentage.toFixed(1) + '%';
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) {
      firstInput.focus();
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Escape key to close modals
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});

// Mobile Navigation
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navCta = document.querySelector('.nav-cta');

  navMenu.classList.toggle('mobile-active');
  navCta.classList.toggle('mobile-active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navMenu = document.querySelector('.nav-menu');
          const navCta = document.querySelector('.nav-cta');
          navMenu.classList.remove('mobile-active');
          navCta.classList.remove('mobile-active');
        }
      }
    });
  });
});

// Form Submission Functions
function submitConsultation(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Show success message
  showSuccessMessage('Consultation request submitted successfully! We will contact you within 2 business hours.');

  // Reset form
  event.target.reset();

  // Close modal
  closeModal('consultationModal');

  // In production, send data to server
  console.log('Consultation request:', data);

  // Example API call (uncomment in production):
  // submitToAPI('consultation', data);
}

function submitReferral(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Show success message
  showSuccessMessage('Referral submitted successfully! You will receive a confirmation email shortly.');

  // Reset form
  event.target.reset();

  // In production, send data to server
  console.log('Referral submitted:', data);

  // Example API call (uncomment in production):
  // submitToAPI('referral', data);
}

function submitContact(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Show success message
  showSuccessMessage('Message sent successfully! We will respond within 2 business hours.');

  // Reset form
  event.target.reset();

  // In production, send data to server
  console.log('Contact form submitted:', JSON.stringify(data));

  // Example API call (uncomment in production):
  submitToAPI('contact', data);
}

function submitQuote(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Get selected services
  const selectedServices = [];
  const serviceCheckboxes = event.target.querySelectorAll('input[name="services"]:checked');
  serviceCheckboxes.forEach(checkbox => {
    selectedServices.push(checkbox.value);
  });
  data.services = selectedServices;

  // Show success message
  showSuccessMessage('Quote request submitted successfully! You will receive a detailed quote within 24 hours.');

  // Reset form
  event.target.reset();

  // Close modal
  closeModal('quoteModal');

  // In production, send data to server
  console.log('Quote request:', data);

  // Example API call (uncomment in production):
  // submitToAPI('quote', data);
}

function submitDownload(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Get the resource type from the button that opened the modal
  const resourceType = event.target.dataset.resource || 'general';
  data.resource = resourceType;

  // Show success message
  showSuccessMessage('Resource download link sent to your email! Please check your inbox.');

  // Reset form
  event.target.reset();

  // Close modal
  closeModal('downloadModal');

  // In production, send data to server and trigger email
  console.log('Download request:', data);

  // Example API call (uncomment in production):
  // submitToAPI('download', data);
}

function submitNewsletter(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Show success message
  showSuccessMessage('Successfully subscribed to newsletter!');

  // Reset form
  event.target.reset();

  // In production, send data to server
  console.log('Newsletter subscription:', data);

  // Example API call (uncomment in production):
  // submitToAPI('newsletter', data);
}

// ROI Calculator
function calculateROI(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const salary = parseFloat(formData.get('salary'));
  const hoursPerWeek = parseFloat(formData.get('hours'));
  const serviceType = formData.get('service');

  if (!salary || !hoursPerWeek || !serviceType) {
    showErrorMessage('Please fill in all fields to calculate your savings.');
    return;
  }

  // Calculate annual in-house cost (salary + benefits + overhead)
  const benefitsMultiplier = 1.3; // 30% for benefits and overhead
  const annualInHouseCost = salary * benefitsMultiplier;

  // Get hourly rate based on service type
  let hourlyRate;
  switch (serviceType) {
    case 'basic':
      hourlyRate = 10;
      break;
    case 'intermediate':
      hourlyRate = 14;
      break;
    case 'advanced':
      hourlyRate = 18;
      break;
    default:
      hourlyRate = 14;
  }

  // Calculate annual outsourcing cost
  const annualHours = hoursPerWeek * 52;
  const annualOutsourcingCost = annualHours * hourlyRate;

  // Calculate savings
  const totalSavings = annualInHouseCost - annualOutsourcingCost;
  const savingsPercentage = (totalSavings / annualInHouseCost) * 100;

  // Display results
  displayROIResults(annualInHouseCost, annualOutsourcingCost, totalSavings, savingsPercentage);
}

function displayROIResults(inHouseCost, outsourcingCost, savings, percentage) {
  document.getElementById('inHouseCost').textContent = formatCurrency(inHouseCost);
  document.getElementById('outsourcingCost').textContent = formatCurrency(outsourcingCost);
  document.getElementById('totalSavings').textContent = formatCurrency(savings);
  document.getElementById('savingsPercentage').textContent = formatPercentage(percentage);

  document.getElementById('roiResults').style.display = 'block';
}

// Success/Error Message Functions
function showSuccessMessage(message) {
  showMessage(message, 'success');
}

function showErrorMessage(message) {
  showMessage(message, 'error');
}

function showMessage(message, type) {
  // Remove existing messages
  const existingMessages = document.querySelectorAll('.message-toast');
  existingMessages.forEach(msg => msg.remove());

  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `message-toast message-${type}`;
  messageElement.textContent = message;

  // Style the message
  messageElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10001;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 500;
    max-width: 400px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    animation: slideInRight 0.3s ease-out;
    background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
  `;

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Add to page
  document.body.appendChild(messageElement);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageElement.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
      }
    }, 300);
  }, 5000);

  // Click to dismiss
  messageElement.addEventListener('click', () => {
    messageElement.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
      }
    }, 300);
  });
}

// API Integration (for production use)
async function submitToAPI(endpoint, data) {
  try {
    const apiUrl = 'https://prod-66.westeurope.logic.azure.com:443/workflows/53cadbbfef26457bb1707cab957b8926/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=Go2-HgQH47bCm74Y0-snhO2IrfcPvMXsfCApOeGPH4U'; // Replace with your actual API endpoint
    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    showErrorMessage('There was an error submitting your request. Please try again.');
  }
}

// Form Validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add real-time validation to forms
document.addEventListener('DOMContentLoaded', function() {
  const emailInputs = document.querySelectorAll('input[type="email"]');
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#ef4444';
        showValidationError(this, 'Please enter a valid email address');
      } else {
        this.style.borderColor = '';
        clearValidationError(this);
      }
    });
  });

  phoneInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#ef4444';
        showValidationError(this, 'Please enter a valid phone number');
      } else {
        this.style.borderColor = '';
        clearValidationError(this);
      }
    });
  });
});

function showValidationError(input, message) {
  clearValidationError(input);

  const errorElement = document.createElement('div');
  errorElement.className = 'validation-error';
  errorElement.textContent = message;
  errorElement.style.cssText = `
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  `;

  input.parentNode.appendChild(errorElement);
}

function clearValidationError(input) {
  const existingError = input.parentNode.querySelector('.validation-error');
  if (existingError) {
    existingError.remove();
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.value-card, .service-card, .pricing-card, .testimonial-card, .city-card, .resource-card');

  animatedElements.forEach(element => {
    observer.observe(element);
  });
});

// Sticky navigation background change
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.backgroundColor = 'var(--color-bg-primary)';
    navbar.style.backdropFilter = 'none';
  }
});

// Update download modal based on resource type
function openDownloadModal(resourceType) {
  const modal = document.getElementById('downloadModal');
  const form = modal.querySelector('form');

  // Set the resource type data attribute
  form.dataset.resource = resourceType;

  // Update modal title based on resource
  const title = modal.querySelector('h2');
  switch(resourceType) {
    case 'mtd-checklist':
      title.textContent = 'Download MTD Compliance Checklist';
      break;
    case 'tax-season-guide':
      title.textContent = 'Download UK Tax Season Guide';
      break;
    default:
      title.textContent = 'Download Free Resource';
  }

  openModal('downloadModal');
}

// Update resource card buttons to use the new function
document.addEventListener('DOMContentLoaded', function() {
  const resourceButtons = document.querySelectorAll('[data-resource]');

  resourceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const resourceType = this.getAttribute('data-resource');
      openDownloadModal(resourceType);
    });
  });
});

// Analytics tracking (replace with your analytics service)
function trackEvent(eventName, properties = {}) {
  // Example for Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }

  // Example for other analytics services
  console.log('Event tracked:', eventName, properties);
}

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const formType = this.className.includes('consultation') ? 'consultation' :
                      this.className.includes('referral') ? 'referral' :
                      this.className.includes('contact') ? 'contact' :
                      this.className.includes('quote') ? 'quote' :
                      this.className.includes('download') ? 'download' :
                      this.className.includes('newsletter') ? 'newsletter' : 'form';

      trackEvent('form_submit', {
        form_type: formType,
        page_url: window.location.href
      });
    });
  });
});

// Track modal opens
const originalOpenModal = openModal;
openModal = function(modalId) {
  trackEvent('modal_open', {
    modal_id: modalId,
    page_url: window.location.href
  });
  return originalOpenModal(modalId);
};

// Performance monitoring
window.addEventListener('load', function() {
  // Log page load time
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log('Page load time:', loadTime + 'ms');

  // Track page load performance
  trackEvent('page_load', {
    load_time: loadTime,
    page_url: window.location.href
  });
});

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);

  // Track errors (but don't overwhelm analytics)
  if (Math.random() < 0.1) { // Only track 10% of errors
    trackEvent('javascript_error', {
      error_message: e.message,
      error_filename: e.filename,
      error_line: e.lineno,
      page_url: window.location.href
    });
  }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
}

console.log('Beacon Accounting website loaded successfully!');