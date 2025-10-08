import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM referrals');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json({ message: 'Error fetching referrals' }, { status: 500 });
  }
}

export async function POST(request) {
  const {
    consent_agreed,
    submitted_by_name,
    first_name,
    last_name,
    date_of_birth,
    primary_language,
    gender,
    pronouns,
    lgbtq_identity,
    phone_number,
    email_address,
    street_address,
    postal_code,
    emergency_contact_first_name,
    emergency_contact_last_name,
    emergency_contact_relation,
    emergency_contact_phone_number,
    mental_health_medical_concerns,
    support_needs,
    reason_for_referral,
    ethnocultural_background,
    status_in_canada,
    status_in_canada_other,
    date_came_to_canada,
    referral_sources,
    referral_source_other,
  } = await request.json();

  try {
    const { rows } = await pool.query(
      `INSERT INTO referrals (
        consent_agreed, submitted_by_name, first_name, last_name, date_of_birth,
        primary_language, gender, pronouns, lgbtq_identity, phone_number, email_address,
        street_address, postal_code, emergency_contact_first_name,
        emergency_contact_last_name, emergency_contact_relation, emergency_contact_phone_number,
        mental_health_medical_concerns, support_needs, reason_for_referral, ethnocultural_background,
        status_in_canada, status_in_canada_other, date_came_to_canada,
        referral_sources, referral_source_other, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
        $18, $19, $20, $21, $22, $23, $24, $25, $26, 'pending'
      ) RETURNING *`,
      [
        consent_agreed, submitted_by_name, first_name, last_name, date_of_birth,
        primary_language, gender, pronouns, lgbtq_identity, phone_number, email_address,
        street_address, postal_code, emergency_contact_first_name,
        emergency_contact_last_name, emergency_contact_relation, emergency_contact_phone_number,
        mental_health_medical_concerns, support_needs, reason_for_referral, ethnocultural_background,
        status_in_canada, status_in_canada_other, date_came_to_canada,
        referral_sources, referral_source_other
      ]
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json({ message: 'Error creating referral' }, { status: 500 });
  }
}
