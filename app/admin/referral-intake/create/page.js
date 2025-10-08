'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> );
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> );
const FileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> );

const SubmissionSuccessModal = ({ onClose }) => {
    const router = useRouter();
    const handleClose = () => {
        onClose();
        router.push('/admin/referral-intake');
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Referral Submitted</h2>
                <p className="text-gray-600 mb-8">Referral submitted successfully to team leaders!</p>
                <Button onClick={handleClose} className="w-full">Close</Button>
            </div>
        </div>
    );
};

export default function CreateReferralPage() {
    const [formData, setFormData] = useState({
        consent_agreed: false,
        submitted_by_name: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        primary_language: '',
        gender: '',
        gender_other: '',
        pronouns: '',
        lgbtq_identity: '',
        phone_number: '',
        email_address: '',
        street_address: '',
        postal_code: '',
        emergency_contact_first_name: '',
        emergency_contact_last_name: '',
        emergency_contact_relation: '',
        emergency_contact_name_na: false,
        emergency_contact_number: '',
        emergency_contact_number_na: false,
        mental_health_concerns: '',
        support_needs: '',
        ethnocultural_background: '',
        status_in_canada: '',
        status_in_canada_other: '',
        date_came_to_canada: '',
        referral_sources: [],
        referral_source_other: '',
    });
    const [fileName, setFileName] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleReferralChange = (name) => (checked) => {
        setFormData((prevData) => {
            const { referral_sources } = prevData;
            if (checked) {
                return { ...prevData, referral_sources: [...referral_sources, name] };
            }
            return {
                ...prevData,
                referral_sources: referral_sources.filter((source) => source !== name),
            };
        });
    };
    
    const handleSelectChange = (id, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/referrals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setShowSuccessModal(true);
        }
    };
    
    const handleClearForm = () => {
        setFileName(null);
        setFormData({
            consent_agreed: false,
            submitted_by_name: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            primary_language: '',
            gender: '',
            gender_other: '',
            pronouns: '',
            lgbtq_identity: '',
            phone_number: '',
            email_address: '',
            street_address: '',
            postal_code: '',
            emergency_contact_first_name: '',
            emergency_contact_last_name: '',
            emergency_contact_relation: '',
            emergency_contact_name_na: false,
            emergency_contact_number: '',
            emergency_contact_number_na: false,
            mental_health_concerns: '',
            support_needs: '',
            ethnocultural_background: '',
            status_in_canada: '',
            status_in_canada_other: '',
            date_came_to_canada: '',
            referral_sources: [],
            referral_source_other: '',
        });
        document.getElementById("referral-form").reset();
    };

    return (
        <>
            <form id="referral-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-3 mb-2">
                        <UserIcon />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Referral Intake System</h1>
                    <p className="text-gray-500">Upload fax documents or manually input referral details</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-8">
                    {fileName ? (
                         <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg max-w-xs mx-auto">
                            <FileIcon />
                            <span className="text-blue-700 font-medium">{fileName}</span>
                        </div>
                    ) : (
                        <>
                            <UploadIcon />
                            <p className="mt-2 text-gray-600">Upload fax document or referral form</p>
                            <p className="text-xs text-gray-400">PDF, PNG, JPG up to 10MB</p>
                        </>
                    )}
                    <label className="cursor-pointer mt-4 inline-block bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900">
                        Choose File
                        <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-6">
                        <div><Label>Today's Date</Label><Input type="date" defaultValue={new Date().toISOString().substring(0, 10)} disabled /></div>
                        <div><Label htmlFor="submitted_by_name">Name of person completing form</Label><Input id="submitted_by_name" placeholder="For parents, guardians, etc." value={formData.submitted_by_name} onChange={handleChange} /></div>
                        <div><Label htmlFor="first_name">First Name</Label><Input id="first_name" value={formData.first_name} onChange={handleChange} /></div>
                        <div><Label htmlFor="last_name">Last Name</Label><Input id="last_name" value={formData.last_name} onChange={handleChange} /></div>
                        <div><Label htmlFor="date_of_birth">Date of Birth</Label><Input id="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} /></div>
                        <div><Label htmlFor="primary_language">Primary Language</Label><Input id="primary_language" value={formData.primary_language} onChange={handleChange} /></div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                                <SelectTrigger><SelectValue placeholder="Select a gender" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Agender">Agender</SelectItem>
                                    <SelectItem value="Gender-fluid">Gender-fluid</SelectItem>
                                    <SelectItem value="Gender Variant">Gender Variant</SelectItem>
                                    <SelectItem value="Genderqueer">Genderqueer</SelectItem>
                                    <SelectItem value="I don't identify with any gender">I don't identify with any gender</SelectItem>
                                    <SelectItem value="I do not know">I do not know</SelectItem>
                                    <SelectItem value="Intersex">Intersex</SelectItem>
                                    <SelectItem value="Man">Man</SelectItem>
                                    <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                                    <SelectItem value="Non-Conforming">Non-Conforming</SelectItem>
                                    <SelectItem value="Prefer not to answer">Prefer not to answer</SelectItem>
                                    <SelectItem value="Questioning">Questioning</SelectItem>
                                    <SelectItem value="Transgender Man">Transgender Man</SelectItem>
                                    <SelectItem value="Transgender Woman">Transgender Woman</SelectItem>
                                    <SelectItem value="Two-Spirit">Two-Spirit</SelectItem>
                                    <SelectItem value="Woman">Woman</SelectItem>
                                    <SelectItem value="Other">Other (please specify)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {formData.gender === 'Other' && <div><Label htmlFor="gender_other">Gender - Other</Label><Input id="gender_other" value={formData.gender_other} onChange={handleChange} /></div>}
                        <div><Label htmlFor="pronouns">Pronouns</Label><Input id="pronouns" value={formData.pronouns} onChange={handleChange} /></div>
                        <div>
                            <Label htmlFor="lgbtq_identity">Do you identify as LGBTQ+?</Label>
                            <Select onValueChange={(value) => handleSelectChange('lgbtq_identity', value)} value={formData.lgbtq_identity}>
                                <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                    <SelectItem value="I do not know">I do not know</SelectItem>
                                    <SelectItem value="Prefer not to answer">Prefer not to answer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div><Label htmlFor="phone_number">Phone Number</Label><Input id="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} /></div>
                        <div><Label htmlFor="email_address">Email Address</Label><Input id="email_address" type="email" value={formData.email_address} onChange={handleChange} /></div>
                        <div><Label htmlFor="street_address">Street Address</Label><Input id="street_address" value={formData.street_address} onChange={handleChange} /></div>
                        <div><Label htmlFor="postal_code">Postal Code</Label><Input id="postal_code" value={formData.postal_code} onChange={handleChange} /></div>
                    </div>
                    <div className="space-y-6">
                        <div><Label htmlFor="emergency_contact_first_name">Emergency Contact First Name</Label><Input id="emergency_contact_first_name" disabled={formData.emergency_contact_name_na} value={formData.emergency_contact_first_name} onChange={handleChange} /></div>
                        <div><Label htmlFor="emergency_contact_last_name">Emergency Contact Last Name</Label><Input id="emergency_contact_last_name" disabled={formData.emergency_contact_name_na} value={formData.emergency_contact_last_name} onChange={handleChange} /></div>
                        <div><Label htmlFor="emergency_contact_relation">Emergency Contact Relationship</Label><Input id="emergency_contact_relation" disabled={formData.emergency_contact_name_na} value={formData.emergency_contact_relation} onChange={handleChange} /></div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="emergency_contact_name_na" checked={formData.emergency_contact_name_na} onCheckedChange={(checked) => handleSelectChange('emergency_contact_name_na', checked)} />
                            <Label htmlFor="emergency_contact_name_na">Not applicable</Label>
                        </div>
                        <div><Label htmlFor="emergency_contact_number">Emergency Contact Number</Label><Input id="emergency_contact_number" type="tel" disabled={formData.emergency_contact_number_na} value={formData.emergency_contact_number} onChange={handleChange} /></div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="emergency_contact_number_na" checked={formData.emergency_contact_number_na} onCheckedChange={(checked) => handleSelectChange('emergency_contact_number_na', checked)} />
                            <Label htmlFor="emergency_contact_number_na">Not applicable</Label>
                        </div>
                        <div>
                            <Label htmlFor="mental_health_concerns">Mental Health and/or Medical Concerns</Label>
                            <Select onValueChange={(value) => handleSelectChange('mental_health_concerns', value)} value={formData.mental_health_concerns}>
                                <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="I have a disability">I have a disability</SelectItem>
                                    <SelectItem value="I have an illness or mental-health concern">I have an illness or mental-health concern</SelectItem>
                                    <SelectItem value="I do not have any ongoing medical conditions">I do not have any ongoing medical conditions</SelectItem>
                                    <SelectItem value="I do not know">I do not know</SelectItem>
                                    <SelectItem value="Not applicable">Not applicable</SelectItem>
                                    <SelectItem value="Prefer not to answer">Prefer not to answer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div><Label htmlFor="support_needs">Support Needed</Label><Textarea id="support_needs" placeholder="Access needs or accommodations" value={formData.support_needs} onChange={handleChange} /></div>
                        <div><Label htmlFor="ethnocultural_background">Ethnocultural Background</Label><Input id="ethnocultural_background" value={formData.ethnocultural_background} onChange={handleChange} /></div>
                        <div>
                            <Label htmlFor="status_in_canada">What option describes your status in Canada?</Label>
                            <Select onValueChange={(value) => handleSelectChange('status_in_canada', value)} value={formData.status_in_canada}>
                                <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="canadian_citizen">Canadian Citizen</SelectItem>
                                    <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                                    <SelectItem value="refugee">Refugee</SelectItem>
                                    <SelectItem value="newcomer">Newcomer</SelectItem>
                                    <SelectItem value="temporary_resident">Temporary Resident</SelectItem>
                                    <SelectItem value="do_not_know">Do not know</SelectItem>
                                    <SelectItem value="prefer_not_to_answer">Prefer not to answer</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {formData.status_in_canada === 'Other' && <div><Label htmlFor="status_in_canada_other">Status in Canada - Other</Label><Input id="status_in_canada_other" value={formData.status_in_canada_other} onChange={handleChange} /></div>}
                        <div><Label htmlFor="date_came_to_canada">Date Came to Canada</Label><Input id="date_came_to_canada" type="date" value={formData.date_came_to_canada} onChange={handleChange} /></div>
                        <div>
                            <Label>How did you hear about CMHA Calgary?</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Advertising" onCheckedChange={handleReferralChange('Advertising')} /><Label htmlFor="Advertising">Advertising</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Clinical Support Professional" onCheckedChange={handleReferralChange('Clinical Support Professional')} /><Label htmlFor="Clinical Support Professional">Clinical Support Professional (i.e. doctor, psychologist)</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="CMHA Calgary Staff Member" onCheckedChange={handleReferralChange('CMHA Calgary Staff Member')} /><Label htmlFor="CMHA Calgary Staff Member">CMHA Calgary Staff Member</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="CMHA Calgary Website" onCheckedChange={handleReferralChange('CMHA Calgary Website')} /><Label htmlFor="CMHA Calgary Website">CMHA Calgary Website</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Family Member" onCheckedChange={handleReferralChange('Family Member')} /><Label htmlFor="Family Member">Family Member</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Friend" onCheckedChange={handleReferralChange('Friend')} /><Label htmlFor="Friend">Friend</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="I do not know" onCheckedChange={handleReferralChange('I do not know')} /><Label htmlFor="I do not know">I do not know</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Internet Search" onCheckedChange={handleReferralChange('Internet Search')} /><Label htmlFor="Internet Search">Internet Search</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Other Non-Profit Organization" onCheckedChange={handleReferralChange('Other Non-Profit Organization')} /><Label htmlFor="Other Non-Profit Organization">Other Non-Profit Organization</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Prefer not to answer" onCheckedChange={handleReferralChange('Prefer not to answer')} /><Label htmlFor="Prefer not to answer">Prefer not to answer</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Social Media" onCheckedChange={handleReferralChange('Social Media')} /><Label htmlFor="Social Media">Social Media</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Teacher/School Counsellor" onCheckedChange={handleReferralChange('Teacher/School Counsellor')} /><Label htmlFor="Teacher/School Counsellor">Teacher/School Counsellor</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="referral_sources" name="Other" onCheckedChange={handleReferralChange('Other')} /><Label htmlFor="Other">Other (please specify)</Label></div>
                            </div>
                        </div>
                        {formData.referral_sources.includes('Other') && <div><Label htmlFor="referral_source_other">How did you hear about CMHA Calgary? - Other</Label><Input id="referral_source_other" value={formData.referral_source_other} onChange={handleChange} /></div>}
                    </div>
                </div>

                <div className="mt-8 border-t pt-8">
                    <h2 className="text-lg font-semibold text-gray-800">Consent and Agreement</h2>
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600">
                            By submitting this form, you consent to the collection and use of your personal information for the purpose of referral and intake. Your information will be kept confidential and will only be shared with authorized personnel.
                        </p>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                        <Checkbox id="consent_agreed" checked={formData.consent_agreed} onCheckedChange={(checked) => handleSelectChange('consent_agreed', checked)} />
                        <Label htmlFor="consent_agreed">Yes, I agree to the terms and conditions.</Label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-10">
                    <Button type="button" variant="outline" onClick={handleClearForm}>Clear form</Button>
                    <Button type="submit">Submit to Team Leaders</Button>
                </div>
            </form>
            
            {showSuccessModal && <SubmissionSuccessModal onClose={() => setShowSuccessModal(false)} />}
        </>
    );
}