// Form validation helpers.
// Each function takes the form values and returns an "errors" object,
// e.g. { email: 'Enter a valid email address.' }. An empty object means valid.
//
// This is a convenience for users (instant, friendly messages). It is NOT
// security: anyone can bypass browser code, so the database will enforce the
// same rules again with constraints and policies in Stage 3.

import { CATEGORIES, CONDITIONS, REQUEST_TYPES, REPORT_REASONS } from './constants.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LIMITS = {
  titleMin: 3,
  titleMax: 100,
  descriptionMin: 10,
  descriptionMax: 2000,
  messageMin: 10,
  messageMax: 1000,
  passwordMin: 8,
  nameMax: 80,
}

export const IMAGE_RULES = {
  maxBytes: 5 * 1024 * 1024, // 5 MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}

function checkLength(errors, field, value, min, max, label) {
  const length = value.trim().length
  if (length === 0) errors[field] = `${label} is required.`
  else if (length < min) errors[field] = `${label} must be at least ${min} characters.`
  else if (length > max) errors[field] = `${label} must be at most ${max} characters.`
}

export function validateEmail(email) {
  if (!email.trim()) return 'Email is required.'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address.'
  return null
}

export function validateLogin({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Password is required.'
  return errors
}

export function validateRegister({ fullName, email, password, confirmPassword }) {
  const errors = {}
  checkLength(errors, 'fullName', fullName, 2, LIMITS.nameMax, 'Full name')
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Password is required.'
  else if (password.length < LIMITS.passwordMin)
    errors.password = `Password must be at least ${LIMITS.passwordMin} characters.`
  if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.'
  return errors
}

export function validateItem({ title, description, category, condition }) {
  const errors = {}
  checkLength(errors, 'title', title, LIMITS.titleMin, LIMITS.titleMax, 'Title')
  checkLength(
    errors,
    'description',
    description,
    LIMITS.descriptionMin,
    LIMITS.descriptionMax,
    'Description',
  )
  if (!CATEGORIES.some((c) => c.slug === category)) errors.category = 'Choose a category.'
  if (!CONDITIONS.some((c) => c.value === condition)) errors.condition = 'Choose a condition.'
  return errors
}

// Returns an error message for a chosen image file, or null if it is acceptable.
export function validateImage(file) {
  if (!file) return null // the image is optional
  if (!IMAGE_RULES.allowedTypes.includes(file.type)) {
    return 'Only JPEG, PNG or WebP images are allowed.'
  }
  if (file.size > IMAGE_RULES.maxBytes) {
    return 'Image must be 5 MB or smaller.'
  }
  return null
}

export function validateContactRequest({ type, message }) {
  const errors = {}
  if (!REQUEST_TYPES.some((r) => r.value === type)) errors.type = 'Choose a request type.'
  checkLength(errors, 'message', message, LIMITS.messageMin, LIMITS.messageMax, 'Message')
  return errors
}

export function validateReport({ reason, details }) {
  const errors = {}
  if (!REPORT_REASONS.some((r) => r.value === reason)) errors.reason = 'Choose a reason.'
  if (details.trim().length > 500) errors.details = 'Details must be at most 500 characters.'
  return errors
}

export function validateContactMessage({ name, email, subject, message }) {
  const errors = {}
  checkLength(errors, 'name', name, 2, LIMITS.nameMax, 'Name')
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  checkLength(errors, 'subject', subject, 3, 120, 'Subject')
  checkLength(errors, 'message', message, LIMITS.messageMin, LIMITS.messageMax, 'Message')
  return errors
}
