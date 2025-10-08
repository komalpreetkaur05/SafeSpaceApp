-- Enum types for structured data from multiple-choice questions
CREATE TYPE lgbtq_status AS ENUM ('yes', 'no', 'do_not_know', 'prefer_not_to_answer');
CREATE TYPE canada_status AS ENUM ('canadian_citizen', 'permanent_resident', 'refugee', 'newcomer', 'temporary_resident', 'do_not_know', 'prefer_not_to_answer', 'other');
CREATE TYPE health_concern AS ENUM ('disability', 'illness_or_mental_health', 'no_ongoing_conditions', 'do_not_know', 'not_applicable', 'prefer_not_to_answer');
