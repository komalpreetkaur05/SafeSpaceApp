DROP TABLE IF EXISTS referrals CASCADE;

-- Main table for storing registration form submissions
CREATE TABLE referrals (
    -- Core Fields
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- Participation and Consent
    consent_agreed BOOLEAN NOT NULL,
    submitted_by_name TEXT, -- For parents, guardians, support workers, etc.

    -- Demographics
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    primary_language TEXT,
    gender TEXT, -- Using TEXT is flexible for the many options and the "Other" field.
    pronouns TEXT,
    lgbtq_identity lgbtq_status,

    -- Contact Information
    phone_number TEXT,
    email_address TEXT,
    street_address TEXT,
    postal_code TEXT,

    -- Emergency Contact
    emergency_contact_first_name TEXT,
    emergency_contact_last_name TEXT,
    emergency_contact_relation TEXT,
    emergency_contact_phone_number TEXT,

    -- Health and Support
    mental_health_medical_concerns health_concern,
    support_needs TEXT, -- For accommodation notes
    reason_for_referral TEXT,

    -- Background
    ethnocultural_background TEXT,
    status_in_canada canada_status,
    status_in_canada_other TEXT, -- For the "Other" specification
    date_came_to_canada DATE, -- Nullable

    -- Referral Source
    referral_sources TEXT[], -- An array to hold multiple selections
    referral_source_other TEXT, -- For the "Other" specification

    -- Referral Processing
    client_id INTEGER, -- Optional: FOREIGN KEY to clients.id if the referral is for an existing client.
    status VARCHAR(50) DEFAULT 'pending', -- e.g., 'pending', 'accepted', 'declined', 'more-info-requested', 'assigned', 'in-progress', 'completed'
    processed_date DATE,
    processed_by_user_id INTEGER, -- FOREIGN KEY to users.id for the user who processed it

    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (processed_by_user_id) REFERENCES users(id)
);
