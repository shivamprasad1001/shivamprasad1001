# Setting Up EmailJS for Contact Form

To enable the contact form functionality, you need to set up an EmailJS account and configure the environment variables:

## Steps:

1. Sign up at [EmailJS](https://www.emailjs.com/) (free tier available)
2. Create a new service (e.g., Gmail, Outlook, etc.)
3. Create a new email template
4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
5. Update the `.env` file in the project root with your credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
6. Run `npm install` to install dependencies
7. Start the development server with `npm run dev`

## Email Template Configuration

When creating your email template in EmailJS, make sure to use the following variable names:
- `user_name` - for the sender's name
- `user_email` - for the sender's email
- `subject` - for the email subject
- `message` - for the message content

Example email template:
```
Name: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}
```