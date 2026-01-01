const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('full_name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full name must be less than 100 characters'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Event creation/update validation
const validateEvent = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Event title must be between 3 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Event description must be at least 10 characters'),
  body('category')
    .isIn(['Conference', 'Workshop', 'Festival', 'Networking', 'Webinar', 'Social'])
    .withMessage('Invalid event category'),
  body('date')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const eventDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        throw new Error('Event date cannot be in the past');
      }
      return true;
    }),
  body('time')
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time in HH:MM format'),
  body('location')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('expected_attendees')
    .isInt({ min: 1 })
    .withMessage('Expected attendees must be at least 1'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateEvent,
  handleValidationErrors
};

