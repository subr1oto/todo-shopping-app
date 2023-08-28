// Contact.tsx
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submissionStatus, setSubmissionStatus] = useState<
        'idle' | 'submitting' | 'success' | 'error'
    >('idle');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors: { [key: string]: string } = {};

        if (!name) {
            validationErrors.name = 'Name is required';
        }

        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'Invalid email format';
        }

        if (!message) {
            validationErrors.message = 'Message is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            // Logic to submit the contact form
            setSubmissionStatus('submitting');
            try {
                const response = await fetch('your_backend_api_url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });

                if (response.ok) {
                    setSubmissionStatus('success');
                } else {
                    setSubmissionStatus('error');
                }
            } catch (error) {
                setSubmissionStatus('error');
            }
        }
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                {/* ...Input fields and error messages */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        required
                    />
                    {errors.message && <p className="error">{errors.message}</p>}
                </div>
                <div>
                    <button type="submit" disabled={submissionStatus === 'submitting'}>
                        {submissionStatus === 'submitting'
                            ? 'Submitting...'
                            : submissionStatus === 'success'
                                ? 'Submitted'
                                : 'Submit'}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default Contact;
